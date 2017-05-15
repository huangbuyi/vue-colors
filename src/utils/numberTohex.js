import padStart from './padStart'

function numberToHex(v) {
	return '#' + padStart(Number(v).toString(16), 6, '0')
}

export default numberToHex