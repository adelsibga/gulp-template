import { Messages } from './Messages.js'

class FormSingle {
  constructor(form) {
    this._handler = ''
    this._downloadLink = ''
    this._loadingClass = 'loading'
    this._hiddenClass = 'hidden'
    this._visibleClass = 'visible'
    this._animationType = 'form__animation-shake'
    this._animationClass = 'animated_form_container'
    this._animationDuration = 500
    this._defaultCompanyName = 'acc'
    this._errorCodeMessages = {
      1: Messages.AskQuestion.FailSubmit,
      2: Messages.CreateAccount.ErrorDuplicate,
      3: Messages.CreateAccount.AnotherError,
      4: Messages.CreateAccount.ErrorSiteAddress,
      5: Messages.CreateAccount.ErrorDuplicateLearnAccount,
      6: Messages.CreateAccount.ErrorDuplicateSiteAddress,
      7: Messages.CreateAccount.ErrorDeleteAccount
    }

    this._form = form
    this._formContainer = this._form.closest('.js-trial-container')
    this._formContainerWrapper = this._form.closest('.js-get-free-trial-page')
    this._SubmitButton = this._form.querySelector('[type="submit"]')
    this._product = this._form.querySelector('[name="product"]').value
    this._isRu = !!document.querySelector('.ru_page')
    this._errorsBlock = this._formContainer.querySelector('.js-trial-error-block')

    const formResultWrapper = this._formContainerWrapper.parentNode
    this._duplicateAccountBlock = formResultWrapper.querySelector('.js-form-result-duplicates-account')
    this._deletedAccountBlock = formResultWrapper.querySelector('.js-form-result-deleted-account')
    this._expiredAccountBlock = formResultWrapper.querySelector('.js-form-result-expired-account')
    this._paidSubscriptionBlock = formResultWrapper.querySelector('.js-form-result-paid-subscription')

    this._agreementDetails = new AgreementDetails(this._form)
    this._formValidation = new FormValidation(this._createValidationSettings())

    this._initPhoneTooltip()
  }

  _initPhoneTooltip() {
    const phoneField = this._form.querySelector('[name="phone"]')
    if (phoneField) {
      phoneField.addEventListener('focus', () => this._showTooltip())
      phoneField.addEventListener('blur', () => this._hideTooltip())
    }
  }

  _showTooltip() {
    const phoneTooltip = this._form.querySelector('.js-input-field-tooltip[data-target="phone"]')
    phoneTooltip.classList.add(this._visibleClass)
    phoneTooltip.style.display = 'block'
  }

  _hideTooltip() {
    const phoneTooltip = this._form.querySelector('.js-input-field-tooltip[data-target="phone"]')
    phoneTooltip.classList.remove(this._visibleClass)
    phoneTooltip.style.display = ''
  }

  _createValidationSettings() {
    return {
      form: this._form,
      config: {
        highlight: (element, errorClass, validClass) => {
          const parent = element.closest('.input_text_field')
          if (parent) {
            parent.classList.remove(validClass)
            parent.classList.add(errorClass)
          }
        },
        unhighlight: (element, errorClass, validClass) => {
          const parent = element.closest('.input_text_field')
          parent.classList.add(validClass)
          parent.classList.remove(errorClass)
        },
        submitHandler: () => this._submitHandler(),
        invalidHandler: () => this._invalidHandler()

      },
      rules: {
        'name': [{
          type: 'required'
        }, {
          type: 'maxlength',
          valuer: 49
        }, {
          type: 'specialChars'
        }],
        'email': [{
          type: 'required'
        }, {
          type: 'email'
        }, {
          type: 'maxlength',
          value: 100
        }],
        'phone': [{
          type: 'required',
          value: () => {
            const isLogged = this._form.querySelector('input[name="is_logged_form"]')
            return !(isLogged && isLogged.value === '1')
          }
        }]
      }
    }
  }

  _invalidHandler() {
    if (this._formContainer.classList.contains(this._animationClass)) {
      this._formContainer.classList.add(this._animationType)
      setTimeout(() => {
        this._formContainer.classList.remove(this._animationType)
      }, this._animationDuration)
    }
  }

  async _submitHandler() {

  }

  _processResult(result) {
    switch (result.status) {
    case 0:
      if (result.error !== 0) {
        this._checkFormErrors(result.error)
      }
      if (result['register_errors'] !== 0) {
        this._checkFormRegisterErrors(result['register_errors'])
      }

      if (result.error === 0 && result['register_errors'] === 0) {
        AmplitudeEventsUtil.sendFormLearmCheckYourEmail(this._product, false)
      }
      break
    case 1:
      if (this._product === 'isspace') {
        pushDatalayerEvent('trial-suite-max')
      }
      break
    default:
      break
    }
  }

  _checkFormErrors(data) {

  }

  _checkFormRegisterErrors(registerErrorCode) {

  }

  _sendGaStatus() {

  }

  _sendGaErrorPageview(code) {

  }

  _initTeamName() {

  }
}
