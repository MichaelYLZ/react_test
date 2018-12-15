import '@babel/polyfill';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCssPlugin from 'mini-css-extract-plugin';

export default ENV => {
    
    return {
        mode: 'production',
        
        plugins: [
            new HtmlWebpackPlugin(
                {   
                    template: './src/index.html',
                }
            ),
            
            new CleanWebpackPlugin(['dist']),
            
            new MiniCssPlugin(),
            
        ],
        
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssPlugin.loader,
                        'css-loader'
                    ]
                }
            ]
        }
    }
}