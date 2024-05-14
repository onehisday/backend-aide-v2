module.exports = {
	apps: [
		{
			name: "aide-backend",
            script: "./app.js",
            watch: true,
            env: {
                NODE_ENV: "production",
				PORT: 3023,
            },
		},
	],
};