const cliProgress = require('cli-progress')

export default function (moduleOptions = {}) {
	this.nuxt.hook('generate:extendRoutes', (routes) => {
		const bar = new cliProgress.Bar(
			{
				format:
					'progress [{bar}] {percentage}% | ETA: {eta}s | {value}/{total} | generated: {route}',
			},
			cliProgress.Presets.shades_classic
		)
		bar.start(routes.length, 0, { route: 'n/a' })
		this.nuxt.hook('generate:routeCreated', ({ route, errors }) => {
			bar.increment()
			bar.update({ route })
		})
	})
	this.nuxt.hook('generate:done', () => {
		bar.stop()
	})
}
