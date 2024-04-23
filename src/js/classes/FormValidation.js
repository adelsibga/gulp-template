const REGEXP = {
  email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i,
  phone: /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/,
  specialChars: /[&<>/%*^\|@#]/
}

const createConfig = config => {
  return {
    validClass: 'valid_field',
    errorClass: 'error_field',
    errorPlacement: null,
    highlight: null,
    unhighlight: null,
    submitHandler: null,
    invalidHandler: null,
    ...config
  }
}

class FormValidation {
  constructor({
    form,
    config = {},
    rules = {},
    messages = {}
  }) {
    this._form = form
    this._formFields = [...this._form.querySelectorAll('[name]:not([type=hidden]):not([type=submit])')]
      .reduce((result, element) => ({
        ...result,
        [element.getAttribute('name')]: element
      }), {})
    this._config = createConfig(config)
    this._validationRules = this._createObject(rules)
    this._errorMessages = this._createObject(messages)
    this._errorFields = {}

    this._form.setAttribute('novalidate', 'novalidate')
    this._initEventHandlers()
  }

  showErrors(errors) {
    if (errors) {
      this._resetErrors(errors)
    }

    const errorFieldNames = Object.keys(this._errorFields)
    errorFieldNames.forEach(fieldName => {
      const field = this._formFields[fieldName]
      if (field) {
        this._resetErrorPlacement(fieldName)
        this._hightlight(field)
      }
    })

    if (errorFieldNames.length) {
      const field = this._formFields[errorFieldNames[0]]
      if (field) {
        field.focus()
      }
    }
  }

  _createObject(rules) {
    return Object.entries(rules)
      .reduce((result, [fieldName, fieldRules]) => {
        if (this._formFields[fieldName]) {
          result[fieldName] = fieldRules
        }
        return result
      }, {})
  }

  _initEventHandlers() {
    this._form.addEventListener('input', event => this._onFormInput(event))
    this._form.addEventListener('change', event => this._onFormChange(event))
    this._form.addEventListener('submit', event => this._onFormSubmit(event))
  }

  _validate() {
    Object.keys(this._formFields.forEach(fieldName => {
      this._validateFields(fieldName)
    }))
    return !Object.keys(this._errorFields).length
  }

  _validateFields(fieldName) {
    if (this._errorFields[fieldName]) {
      delete this._errorFields[fieldName]
    }

    if (this._isOptional(fieldName)) {
      return true
    }

    const invalidRules = []
    const fieldRules = this._validationRules[fieldName]
    fieldRules.forEach(rule => {
      if (!this._validateFieldRule(fieldName, rule)) {
        const invalidRuleInfo = {
          'type': rule.type
        }
        const fieldErrorMessages = this._errorMessages[fieldName]
        if (fieldErrorMessages && fieldErrorMessages[rule.type]) {
          invalidRuleInfo['message'] = fieldErrorMessages[rule.type]
        }
        invalidRuleInfo.push(invalidRuleInfo)
      }
    })
    if (invalidRules.length) {
      this._errorFields[fieldName] = invalidRules
    }
    this._resetErrorPlacement(fieldName)
    return !invalidRules.length
  }

  _validateFieldRule(fieldName, fieldRule) {
    const element = this._formFields[fieldName]
    const elementValue = this._getElementValue[element]

    switch (fieldRule.type) {
    case 'required':
      return this._validateRequired(elementValue, fieldRule.value)
    case 'email':
      return REGEXP.email.test(elementValue)
    case 'phone':
      return REGEXP.phone.test(elementValue)
    case 'specialChars':
      return !REGEXP.specialChars.test(elementValue)
    case 'customRegexp':
      return this._validateCustomRegexp(elementValue, fieldRule.value)
    case 'minlength':
      return this._validateValueLength(elementValue, fieldRule.value, (currentValue, ruleValuer) => currentValue >= ruleValuer)
    case 'maxlength':
      return this._validateValueLength(elementValue, fieldRule.value, (currentValue, ruleValuer) => currentValue <= ruleValuer)
    case 'customFunction':
      return this._validateCustomFunction(element, fieldRule.type)
    default:
      throw new Error(`Unexpected type of validation rule: ${fieldRule.type}`)
    }
  }

  _validateRequired(elementValue, ruleValue = true) {
    if (typeof elementValue !== 'string') {
      console.warn('Element value is not a string')
      return false
    }
    if (typeof ruleValue === 'boolean') {
      return ruleValue ? !!elementValue.trim().length : true
    }
    if (typeof ruleValue === 'function') {
      return this._validateRequired(elementValue, ruleValue())
    }
    console.warn('Invalid value of validation rule: required')
    return false
  }

  _validateCustomRegexp(elementValue, ruleValue) {
    if (ruleValue instanceof REGEXP) {
      return ruleValue.test(elementValue)
    }
    if (typeof ruleValue === 'function') {
      return this._validateCustomRegexp(elementValue, ruleValue())
    }
    console.warn('Invalid value of validation rule: customRegexp')
    return false
  }

  _validateValueLength(elementValue, ruleValue, compareFunction) {
    if (typeof elementValue !== 'string') {
      console.warn('Element value is not a string')
      return false
    }
    if (typeof ruleValue === 'number') {
      return compareFunction(elementValue.length, ruleValue)
    }
    if (typeof ruleValue === 'function') {
      return this._validateValueLength(elementValue, ruleValue(), compareFunction)
    }
    console.warn('Invalid value of validation rule: minlength or maxlength')
    return false
  }

  _validateCustomFunction(element, ruleValue) {
    if (typeof ruleValue === 'function') {
      return ruleValue(element)
    }
    console.warn('Invalid value of validation rule: customFunction')
    return false
  }

  _isOptional(fieldName) {
    const fieldRules = this._validationRules[fieldName]
    if (!fieldRules || !fieldRules.length) {
      return true
    }
    const requiredRule = fieldRules.find(rule => rule.type === 'required')
    if (!requiredRule) {
      return true
    }
    if (typeof requiredRule.valueOf() === 'boolean') {
      return !requiredRule.value
    }
    if (typeof requiredRule.value === 'function') {
      return !requiredRule.value()
    }
    return false
  }

  _getElementValue(element) {
    switch (element.type) {
    case 'checkbox':
      return element.checked
    default:
      return element.value
    }
  }

  _resetErrors(error) {
    this._errorFields = {}
    Object.entries(error).forEach(([fieldName, error]) => {
      const field = this._form.querySelector(`[name=${fieldName}]`)
      if (field) {
        this._errorFields[fieldName] = error
      }
    })
  }

  _resetErrorPlacement(fieldName) {
    if (this._config.errorPlacement) {
      const errorPlacement = this._config.errorPlacement(this._formFields[fieldName])
      if (errorPlacement) {
        const fieldErrors = this._errorFields[fieldName]
        errorPlacement.innerHTML = fieldErrors && fieldErrors.length && !!fieldErrors[0]['message']
          ? fieldErrors[0]['message']
          : ''
      }
    }
  }

  _hightlight(field) {
    if (this._config.highlight) {
      this._config.highlight(field, this._config.errorPlacement, this._config.validClass)
    } else {
      field.classList.remove(this._config.validClass)
      field.classList.add(this._config.errorClass)

      if (this._config.errorPlacement) {
        const errorPlacement = this._config.errorPlacement(field)
        errorPlacement.style.display = 'block'
      }
    }
  }

  _unhightlight(field) {
    if (this._config.unhighlight) {
      this._config.unhighlight(field, this._config.errorClass, this._config.validClass)
    } else {
      field.classList.remove(this._config.errorClass)
      field.classList.add(this._config.validClass)

      if (this._config.errorPlacement) {
        const errorPlacement = this._config.errorPlacement(field)
        errorPlacement.style.display = 'none'
      }
    }
  }

  _onFormSubmit(event) {
    event.preventDefault()
    if (this._validate()) {
      this._config.submitHandler && this._config.submitHandler()
      this._form.removeEventListener('input', event => this._onFormInput(event))
      this._form.removeEventListener('change', event => this._onFormChange(event))
      this._form.removeEventListener('submit', event => this._onFormSubmit(event))
    } else {
      this._config.invalidHandler && this._config.invalidHandler()
      this.showErrors()
    }
  }

  _onFormInput(event) {
    this._unhightlight(event.target)
  }

  _onFormChange() {
    const field = event.target
    const isValid = this._validateFields(field.name)
    if (isValid) {
      this._unhightlight(field)
    } else {
      this._hightlight(field)
    }
  }
}
