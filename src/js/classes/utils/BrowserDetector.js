/* eslint-disable */
const BrowserName = {
	CHROME: 'Chrome',
	EDGE: 'Edge',
	FIREFOX: 'Firefox',
	IE: 'IE',
	SAFARI: 'Safari',
	SAFARI_MOBILE: 'Mobile Safari',
	OPERA: 'Opera',
	YANDEX: 'Yandex'
}

const LastUnsupportedVersion = {
	[BrowserName.CHROME]: '86.0',
	[BrowserName.OPERA]: '95.0',
	[BrowserName.EDGE]: '99.0',
	[BrowserName.SAFARI]: '15.0',
	[BrowserName.SAFARI_MOBILE]: '15.0',
	[BrowserName.FIREFOX]: '78.0',
	[BrowserName.YANDEX]: '22.0'
}

const defaultVersionNumbers = {
	major: 0,
	minor: 0,
	patch: 0
}

class BrowserDetector {
	isBrowserSupported(userAgent) {
		const browser = userAgent ? UAParser(userAgent).browser : UAParser().browser
		if (!browser || !browser.name || !browser.version) {
			return true
		}

		if (browser.name === BrowserName.IE) {
			return false
		}
		const browserCurrentVersionNumbers = this._getBrowserVersionNumbers(browser.version)
		const browserLastSupportedVersionNumbers = this._getBrowserLastUnsupportedVersionNumbers(browser.name)

		if (Number(browserCurrentVersionNumbers.major) > Number(browserLastSupportedVersionNumbers.major)) {
			return true
		}

		return Number(browserCurrentVersionNumbers.major) === Number(browserLastSupportedVersionNumbers.major)
			&& Number(browserCurrentVersionNumbers.minor) > Number(browserLastSupportedVersionNumbers.minor)
	}

	_getBrowserVersionNumbers(version) {
		const versionNumbers = version.split('.')

		return {
			major: versionNumbers[0] ? versionNumbers[0] : defaultVersionNumbers.major,
			minor: versionNumbers[1] ? versionNumbers[1] : defaultVersionNumbers.minor,
			patch: versionNumbers[2] ? versionNumbers[2] : defaultVersionNumbers.patch
		}
	}

	_getBrowserLastUnsupportedVersionNumbers(browserName) {
		if (Object.keys(LastUnsupportedVersion).includes(browserName)) {
			return this._getBrowserVersionNumbers(LastUnsupportedVersion[browserName])
		}

		return defaultVersionNumbers
	}
}