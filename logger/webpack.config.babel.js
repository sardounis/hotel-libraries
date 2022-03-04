import { join } from 'path';

const include = join(__dirname, 'src');

export default {
	entry: './src/winston.js',
	output: {
		path: join(__dirname, 'dist'),
		libraryTarget: 'umd',
		library: 'logger',
	},
	//devtool: 'inline-source-map',
	module: {
		rules: [
			{ test: /\.js$/, loader: 'babel-loader', include },
		],
	},
	node: {
		fs: 'empty'
	},
};
