import calcEventPosition from '../calcEventPosition'

function mockEventPosition(pageX, pageY) {
	return { pageX, pageY }
}

function mockContainer(left, top, clientWidth, clientHeight) {
	return {
		clientWidth,
		clientHeight,
		getBoundingClientRect: function () {
			return { left, top }
		}
	}
}


describe('test calcEventPosition', () => {
	it('valid inside container', () => {
		const e = mockEventPosition(150,150)
		const cont = mockContainer(100,100,100,100)
		expect(calcEventPosition(e, cont)).toEqual({
			leftP:0.5,
			topP:0.5
		})
	})

	it('zero on corner', () => {
		const e = mockEventPosition(100,100)
		const cont = mockContainer(100,100,100,100)
		expect(calcEventPosition(e, cont)).toEqual({
			leftP:0,
			topP:0
		})
	})

	it('zero on left-top outside', () => {
		const e = mockEventPosition(0,0)
		const cont = mockContainer(100,100,100,100)
		expect(calcEventPosition(e, cont)).toEqual({
			leftP:0,
			topP:0
		})
	})

	it('1,1 on right-bottom outside', () => {
		const e = mockEventPosition(500,500)
		const cont = mockContainer(100,100,100,100)
		expect(calcEventPosition(e, cont)).toEqual({
			leftP:1,
			topP:1
		})
	})
	
})