/*eslint no-useless-escape:*/
import CodeHighlighter from "@components/CodeHighlighter";
import React from "react";
import "./BasicWebpack.css";

function BasicWebpack(this: any) {
  const data = {
    path: `
    /*
    src 폴더안에 index.js가 있고 dist 폴더가 존재해야 터미널에서 명령어로 webpack를 실행할수있다.
    /dist , /src/index.js

    wewbpack 실행시 target이란 어떤 환경에서 실행되는지 설정해주는것! 웹팩에게 어떠한 환경인지 알려준다.
    npx webpack --target=node
     */
    `,
    path2: `
    const path = require("path");
    // D:\\webpack_prac\\01_webpack\\src 내가 사용한 파일의 절대 경로
    console.log(__dirname);

    const pathTest = path.resolve(__dirname, "abc");
    // D:\\webpack_prac\\01_webpack\\src\\abc 내가 사용한 파일의 절대 경로에서 abc 추가!
    console.log(pathTest);
    `,
    path3: `
    // __dirname 과 path 내장모듈로 경로를 만든다.
    const path = require("path");
    module.exports = {
      // main이 되는 파일 경로
      entry: "./src/index.js",
      // 파일이 생성되는 경로이고, 절대경로로 설정해주어야한다. __dirname으로 파일 경로 생성
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
      },
      // 웹팩이 인식할수있도록 환경이 무엇인지 target으로 설정
      target: "node",
    };

    `,
    path4: `
    // Loader
    module.exports ={
        module:{
            rules:[loader1,loader2..]
        }
    }`,
    path5: `
    절대경로 (무조건 파일의 가장 최상단 경로)
    /dist/bundle.js
    앞에 .이 있다면 지금있는파일의 위치가 된다
    ./dist/bundle.js`,
    path6: `
    // __dirname 과 path 내장모듈로 경로를 만든다.
    const path = require("path");
    module.exports = {
      mode: "development",
      // main이 되는 파일 경로
      entry: "./src/index.js",
      // 파일이 생성되는 경로이고, 절대경로로 설정해주어야한다. __dirname으로 파일 경로 생성
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
      },
      // 웹팩이 인식할수있도록 환경이 무엇인지 target으로 설정(참고로 target을 지정해주지않으면 brower를 의미하는 web으로 지정된다.)
      target: ["web", "es5"],
      //   loader 설정 style-loader가 css-loader보다 먼저 와야한다.
      module: {
        rules: [
          {
            test: /\.css$/i,
            use: [
              {
                loader: "style-loader",
                // 참고로 injectType은 스타일이 DOM에 주입되는 방식을 설정할수 있고, singletonStyleTag로 설정하게 되면 말그대로 style태그를 1개만 써서 합쳐지게 된다.
                options: {
                  injectType: "singletonStyleTag",
                },
              },
              {
                loader: "css-loader",
                options: {
                  modules: true,
                },
              },
            ],
          },
        ],
      },
    };
    `,
    path7: `
    /* index.css */
    div {
      color: crimson;
    }

    .hellowebpack {
      color: blue;
    }

    `,
    path8: `
    // index.js 모듈화하지 않았을 경우에는 그냥 import만 하면 된다.
    import "normalize.css";
    import "./index.css";

    // 모듈화하면 아래처럼 필요한 style태그의 내용을 불러올 수 있다.
    import styles from "./index.css";

    function component() {
      const element = document.createElement("div");
      element.innerHTML = "hello";
      console.log(styles, ": sytyles");
      // {hellowebpack: 'yi39fuEg1urw6SGiN6as'} ': sytyles'
      // 이렇게 key value 형태로 가져올수있다.
      element.classList = styles.hellowebpack;
      return element;
    }

    document.body.appendChild(component());

    `,
    path9: `
    // Plugin
    module.export = {
        plugins:[new Plugin({...options}),...]
    }
    `,
    path10: `
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    module.exports = {
      mode: "development",
      module: {
      },
      ...
      plugins: [
        new HtmlWebpackPlugin({
          template: "./src/template.html",
        }),
      ],
    };
    `,
    path11: `
    <!-- dist 파일에도 index.html이 추가가되고 script태그를 따로 연결해주지 않아도 추가가 된다. -->
    <!-- dist/index.html -->
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script defer src="bundle.js"></script>
      </head>
      <body></body>
    </html>
    `,
    path12: `
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    module.exports = {
      ...
      target: ["web", "es5"],
      //   loader 설정 style-loader가 css-loader보다 먼저 와야한다.
      module: {
        rules: [
        // handlebars-loader 설치하여 추가
          {
            test: /\.hbs$/,
            use: ["handlebars-loader"],
          },
        ],
      },
    // template.html 파일 이름을 template.hbs로 수정
      plugins: [
        new HtmlWebpackPlugin({
          title: "webpack",
          template: "./src/template.hbs",
          meta: {
            viewport: "width=device-width, initial-scale=1.0",
          }
        })
      ],
      ...
    };
    `,
    path13: `
    {{!-- template.hbs --}}
    <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       {{!-- htmlWebpackPlugin에서 options에 있는 title를 가져올 수 있다. --}}
       <title>webpack {{htmlWebpackPlugin.options.title}}</title>
     </head>
     <body></body>
   </html>
    `,
    path14: `
    <!-- dist/index.html 빌드한 결과 title에 htmlWebpackPlugin.options.title이 추가가 되었다. -->
    <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta http-equiv="X-UA-Compatible" content="IE=edge" />
       <title>webpack webpack</title>
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <script defer src="runtime.58f16c0bcb05c0fa8b6d.js"></script>
       <script defer src="venders.e7afafce9829ca5b351d.js"></script>
       <script defer src="main.a22d68f7c560db155a59.js"></script>
       <link href="1934af4503412bf74059.css" rel="stylesheet" />
     </head>
     <body></body>
   </html>
    `,
    path15: `
    module.exports = {
      mode: "development",
      // main이 되는 파일 경로
      entry: "./src/index.js",
      // 파일이름에 사용할 수 있는 해쉬는 총 3가지 hash, contenthash, chunkhash 이다.
      output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
      },
      // 웹팩이 인식할수있도록 환경이 무엇인지 target으로 설정(참고로 target을 지정해주지않으면 brower를 의미하는 web으로 지정된다.)
      target: ["web", "es5"],
      module: {
      },
      ...
    };
    `,
    path16: `
    filename: "[name].[hash].js" => 이러한 방식으로 hash를 부여할 수 있다.
    `,
    path17: `
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");
    module.exports = {
      mode: "development",
      // main이 되는 파일 경로
      entry: "./src/index.js",
      output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
      },
      target: ["web", "es5"],
      module: {
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: "webpack",
          template: "./src/template.hbs",
          meta: {
            viewport: "width=device-width, initial-scale=1.0",
          },
        }),
        // 플러그인에 추가
        new CleanWebpackPlugin(),
      ],
    };
    `,
    path18: `
    const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  mode: "development",
  // main이 되는 파일 경로
  entry: "./src/index.js",
  output: {
    filename: "[name].[chunkhash].js",
    path: path.resolve(__dirname, "dist"),
  },
  target: ["web", "es5"],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 이렇게 하면 contenthash값을 가진 css 파일을 만들 수 있다.
    new MiniCssExtractPlugin({
      filename: "[contenthash].css",
    }),
  ],
...
};
    `,
    path19: `
    const path = require("path");
    module.exports = {
      mode: "development",
      // main이 되는 파일 경로
      entry: "./src/index.js",
      // chunk 파일을 만들기 위해 아래처럼 수정해준다.
      output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
      },
      target: ["web", "es5"],
      // 번들 파일을 최적화시켜준다.
      optimization: {
        runtimeChunk: {
          name: "runtime",
        },
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "venders",
              chunks: "all",
            },
          },
        },
      },
    };
    `,
    // eslint-disable-next-line no-template-curly-in-string
    path20: ".${styles.hellowebpack}",
    path21: (data: any) => `
    // index.js
    import "normalize.css";
    import "./index.css";
    import $ from "jquery";

    function component() {
      const element = document.createElement("div");
      element.innerHTML = "hello~";
      element.classList = styles.hellowebpack;
      return element;
    }

    document.body.appendChild(component());
    // jquery 적용
    console.log($(${data.path20}).length);

    `,
    path22: `
    <!-- dist/index.html -->
    <!-- 실제로 dist 파일에
     main.a22d68f7c560db155a59.js,
     runtime.58f16c0bcb05c0fa8b6d.js,
     venders.e7afafce9829ca5b351d.js 파일이 각각 생성이 됨 -->
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>webpack webpack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script defer src="runtime.58f16c0bcb05c0fa8b6d.js"></script>
        <script defer src="venders.e7afafce9829ca5b351d.js"></script>
        <script defer src="main.a22d68f7c560db155a59.js"></script>
        <link href="1934af4503412bf74059.css" rel="stylesheet" />
      </head>
      <body></body>
    </html>
    `,
    path23: `
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    module.exports = {
      mode: "development",
      entry: "./src/index.js",
      output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
      },
      ...
    // minify 옵션으로 최적화시킬수 있다(공백제거,타입명시 제거 등등)
      plugins: [
        new HtmlWebpackPlugin({
          title: "webpack",
          template: "./src/template.hbs",
          meta: {
            viewport: "width=device-width, initial-scale=1.0",
          },
          minify: {
            collapseWhitespace: true,
            useShortDoctype: true,
            removeScriptTypeAttributes: true,
          },
        }),
      ],
    };
    `,
    path24: `
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
    const TerserPlugin = require("terser-webpack-plugin");
    module.exports = {
      mode: "development",
      entry: "./src/index.js",
      output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
      },
      //minimize를 true로 설정하여 최적화
      optimization: {
        minimize: true,
        minimizer: [
          // css파일 최적화시키고, 주석관련내용은 전부 제거해준다.
          new CssMinimizerPlugin({
            minimizerOptions: {
              preset: [
                "default",
                {
                  discardComments: { removeAll: true },
                },
              ],
            },
          }),
          // js파일을 압축하고 주석을 제거해준다.
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
            extractComments: false,
          }),
        ],
        runtimeChunk: {
          name: "runtime",
        },
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: "venders",
              chunks: "all",
            },
          },
        },
      },
    };
    `,
    path25: `
    // __dirname 과 path 내장모듈로 경로를 만든다.
    // webpack.common.js 공통적으로 사용되는 내용을 적어준다.
    const path = require("path");
    const HtmlWebpackPlugin = require("html-webpack-plugin");
    const { CleanWebpackPlugin } = require("clean-webpack-plugin");
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const webpack = require("webpack");

    const isProduction = process.env.NODE_ENV === "PRODUCTION";
    module.exports = {
      entry: "./src/index.js",
      output: {
        filename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, "dist"),
      },
      target: ["web", "es5"],
      module: {
        rules: [
          {
            test: /\.s?css$/i,
            // 여러 rules중 하나의 룰을 정할수있다.
            oneOf: [
              {
                test: /\.module\.s?css$/,
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  {
                    loader: "css-loader",
                    options: {
                      modules: true,
                    },
                  },
                  "sass-loader",
                ],
              },
              {
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  "css-loader",
                  "sass-loader",
                ],
              },
            ],
          },
          {
            test: /\.hbs$/,
            use: ["handlebars-loader"],
          },
          {
            //   i는 대소문자를 구별하지 않는다는뜻이다 $는끝맺음
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: "file-loader",
                options: {
                  name() {
                    if (!isProduction) {
                      return "[path][name].[ext]";
                    }
                    return "[contenthash].[ext]";
                  },
                  publicPath: "assets/",
                  outputPath: "assets/",
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  // 파일크기이고 byte단위로적으면됨
                  limit: 8192,
                },
              },
            ],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({
          title: "webpack",
          template: "./src/template.hbs",
          meta: {
            viewport: "width=device-width, initial-scale=1.0",
          },
          minify: isProduction
            ? {
                collapseWhitespace: true,
                useShortDoctype: true,
                removeScriptTypeAttributes: true,
              }
            : false,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: "[contenthash].css",
        }),
        new webpack.DefinePlugin({
          IS_PRODUCTION: isProduction,
        }),
      ],
    };
    `,
    path26: `
    // webpack.dev.js
    const { merge } = require("webpack-merge");
    const common = require("./webpack.common");

    const config = {
      mode: "development",
      devServer: {
        open: false,
        // overlay: true, //에러발생시, 오버레이화면으로 에러메세지를 보여준다.
        //  해당 옵션을 true로 설정하면 기존주소에서 /hello 같은 매개변수를 추가하더라도 루트 디렉토리로 이동할 수 있다. 라우팅 제공 그래서 spa 에서 많이 쓰인다.
        // historyApiFallback: true,
        historyApiFallback: {
          rewrites: [
            { from: /^\/subpage/, to: "/src/subpage.html" },
            { from: /./, to: "/src/404.html" },
          ],
        },
        port: 8080,
      },
    };
    module.exports = merge(common, config);
    `,
    path27: `
    // __dirname 과 path 내장모듈로 경로를 만든다.
// webpack.prod.js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const config = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
    runtimeChunk: {
      name: "runtime",
    },
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "venders",
          chunks: "all",
        },
      },
    },
  },
};

module.exports = merge(common, config);
    `,
    path28: `
    "scripts": {
      "start": "cross-env NODE_ENV=DEVELOPMENT webpack-dev-server --config webpack.dev.js",
      "build": "cross-env NODE_ENV=PRODUCTION webpack --config webpack.prod.js",
      "dev": "cross-env NODE_ENV=DEVELOPMENT webpack --config webpack.dev.js"
    },
    `,
    path29: `
    npm i webpack-dev-server
// package.json에 추가
"start": "cross-env NODE_ENV=DEVELOPMENT webpack-dev-server --config webpack.dev.js"`,
    path30: `
modules.exports = {
  mode: "development",
  devServer: {
    // 개발서버실행시 창 오픈 자동으로 해줄건지 여부
    open: false,
    // overlay: true, //에러발생시, 오버레이화면으로 에러메세지를 보여준다.
    //  해당 옵션을 true로 설정하면 기존주소에서 /hello 같은 매개변수를 추가하더라도 루트 디렉토리로 이동할 수 있다. 라우팅 제공 그래서 spa 에서 많이 쓰인다.
    // historyApiFallback: true,
    historyApiFallback: {
      rewrites: [
        { from: /^\/subpage/, to: "/src/subpage.html" },
        { from: /./, to: "/src/404.html" },
      ],
    },
    port: 8080,
  },
}
  `,
    path31: `
  module.exports = {
    ...
    module: {
      rules: [
        {
          //   i는 대소문자를 구별하지 않는다는뜻이다 $는끝맺음
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name() {
                  if (!isProduction) {
                    return "[path][name].[ext]";
                  }
                  return "[contenthash].[ext]";
                },
                publicPath: "assets/",
                // 위에서정한 output의 경로안에 폴더를 추가할 수 있다.
                outputPath: "assets/",
              },
            },
          ],
        },
      ],
    },
    ...
  };
  `,
    path32: `
  /*
  src/images/and.png

  webpack 번들링 결과 개발 환경
  dist/assets/src/images.ang.png

  webpack 번들링 결과 production 환경
  dist/assets/acf27d0c7e1be19b448759397fe7c32c.png

   */
  `,
    path33: `
  module.exports = {
    module: {
      rules: [
        {
          test: /\.svg$/,
          use: [
            {
              loader: "url-loader",
              options: {
                // 파일크기이고 byte단위로적으면됨 8192는 8 키로바이트까지 제한을 두겠다는 뜻
                limit: 8192,
              },
            },
          ],
        },
      ],
    },
  };
  `,
    path34: `
  module.exports = {
    ....
    module: {
      rules: [
        {
          test: /\.s?css$/i,
          // 여러 rules중 하나의 룰을 정할수있다.
          oneOf: [
            {
              // 파일명에 module이 들어가면 모듈화할수 있도록 구분
              test: /\.module\.s?css$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                  },
                },
                "sass-loader",
              ],
            },
            {
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                "css-loader",
                "sass-loader",
              ],
            },
          ],
        },
      ],
    },
  };

  `,
    path35: `
  // 모듈화하면 아래처럼 js파일에서 필요한 style태그의 내용을 불러올 수 있다.
  import styles from "./index.module.scss";
  `,
    path36: `
  npm i postcss postcss-loader autoprefixer
  `,
    path37: `
  // postcss.config.js 생성후 autoprefixer 불러오기
  module.exports = {
    plugins: [require("autoprefixer")],
  };

  `,
    path38: `
  // 참고로 postccssLoader 사용시 prefixer 접두사를 추가할 때 브라우저의 범위를 지정해야
  // webkit 이외의 접수사도 추가할 수 있다.
  const postcssLoder = {
    loader: "postcss-loader",
    options: {
      config: {
        path: "postcss.config.js",
      },
    },
  };
  module.exports = {
    ....
    module: {
      rules: [
        {
          test: /\.s?css$/i,
          // 여러 rules중 하나의 룰을 정할수있다.
          oneOf: [
            {
              // 파일명에 module이 들어가면 모듈화할수 있도록 구분
              test: /\.module\.s?css$/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                {
                  loader: "css-loader",
                  options: {
                    modules: true,
                  },
                },
                postcssLoder,
                "sass-loader",
              ],
            },
            {
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                },
                "css-loader",
                postcssLoder,
                "sass-loader",
              ],
            },
          ],
        }
      ],
    },
  };

  `,
    path39: `
    "browerslist": [
      // 각 브라우저별로 최신버전과 최신버전직전버전까지
      "last 2 versions",
      "IE 10",
      "FireFox > 20"
    ]
  `,
    path40: `
  npm i @babel/cli @babel/core @babel/preset-env

  웹팩에서 바벨사용하려면
  npm i babel-loader
  `,
    path41: `
  // babl.config.js 에 설정 적용
  module.exports = {
    presets: ["@babel/preset-env"],
  };
  `,
    path42: `
  module.exports = {
    ....
    module: {
      rules: [
        {
          // js파일은 babel-loader 적용
          teset: /.js/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
      ],
    },
  };

  `,
    path43: `
  // babel polyfill은 js파일에 불러와야한다.
  // index.js
  import "@babel/polyfill";
  `,
  };
  return (
    <div>
      <div className="r_con">
        <h2>webpack</h2>
        <p>
          <a href="https://webpack.js.org/">Webpack</a>
          이란 번들러이다.
        </p>
        <div>웹팩은 모듈들을 모아 번들링을 해주는 것!</div>
        <p>bundle이 중요한 이유</p>
        <ul>
          <li>
            - 모듈을 모아주기 때문에 모듈을 로드하기 위해 검색하는 시간이 단축 .
          </li>
          <li>- 사용되지 않는 코드를 제거해준다</li>
          <li>- 파일 크기를 줄여준다.</li>
        </ul>
        <div className="box_container">
          <h3>1. Webpack 기본</h3>
          <div className="content_box">
            <h4>- 기본</h4>
            <div>우선 package.json 생성</div>
            <CodeHighlighter type="javascript" content="npm init -y" />
            <div>- Webpack 설치</div>
            <p>webpack-cli 는 웹팩 명령어를 실행해줄 수 있는 패키지이다.</p>
            <CodeHighlighter
              type="javascript"
              content=" npm i webpack webpack-cli --save-dev"
            />
            <div>- Webpack 실행</div>
            <p>
              npx 란 node_modules 폴더에서 실행파일을 찾아 실행할수 있게 해주는
              명령어이다.(node_modules/.bin 폴더에접근하여 실행)
            </p>
            <CodeHighlighter type="javascript" content=" npx webpack" />
            <CodeHighlighter type="javascript" content={data.path} />
          </div>
          <div className="content_box">
            <div className="title">1. Webpack 기본 구조</div>
            <p>
              내장 모듈인 path와 __dirname를 사용하여 entry와 out Webpack 설정을
              해준다.
            </p>
            <CodeHighlighter type="javascript" content={data.path2} />
            <CodeHighlighter type="javascript" content={data.path3} />
            <CodeHighlighter type="javascript" content={data.path5} />
          </div>
          <div className="content_box">
            <div>Loader</div>
            <p>Loader 설정</p>
            <p>loader는 필요한 loader들을 npm으로 설치하여 적용시킬수있다.</p>
            <CodeHighlighter type="javascript" content={data.path4} />
            <br />
            <div className="sub_box">
              <p>style-loader와 css-loader</p>
              <CodeHighlighter type="javascript" content={data.path6} />
              <p>
                로더는 배열형태로 작성할수도 있지만, 위처럼 options이 필요한
                경우, 객체 형태로도 작성할 수 있다. (옵션에 대한 내용은 webpack
                문서에서 검색하면 된다.)
                <a href="https://webpack.js.org/loaders/style-loader/#root">
                  웹팩 style-laoder 옵션 설정에 관한 문서
                </a>
              </p>
              <br></br>
              <p>
                css-loader 의 options를 modules를 true로 설정한 경우, css를
                모듈화하여 가져올 수 있다.
              </p>
              <CodeHighlighter type="css" content={data.path7} />
              <CodeHighlighter type="javascript" content={data.path8} />
            </div>
          </div>
          <div className="content_box">
            <div>Plugin</div>
            <p>Plugin 설정</p>
            <p>
              Plugin은 웹팩이 동작하는 전체적인 과정에 개입할 수 있기 때문에
              번들 파일에 변화를 주기도하고, 개발의 편의성이나 production
              모드에서 코드의 최적화를 진행해주는 등 다양한 기능을 할수 있다.
            </p>
            <CodeHighlighter type="javascript" content={data.path9} />
            <br />
            <div className="sub_box">
              <p>html-webpack-plugin</p>
              <CodeHighlighter type="javascript" content={data.path10} />
              <CodeHighlighter type="html" content={data.path11} />
              <p>
                html-webpack-plugin은 html문서에 script 태그를 작성하지 않아도,
                webpack.config.js에서 지정한 js 파일을 연결해준다.
                <a href="https://github.com/jantimon/html-webpack-plugin#options">
                  웹팩 html-webpack-plugin 옵션 설정에 관한 문서
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="box_container">
          <div className="content_box">
            <div className="title">2. Webpack 설정</div>
            <p>handlebars 설정</p>
            <p>시맨틱 템플릿을 구축하는 데 필요한 기능을 제공해준다.</p>
            <CodeHighlighter type="javascript" content={data.path12} />
            <CodeHighlighter type="html" content={data.path13} />
            <p>
              webpack으로 번들링한 결과 title에
              htmlWebpackPlugin.options.title이 추가가 됨
            </p>
            <CodeHighlighter type="html" content={data.path14} />
          </div>
          <div className="content_box">
            <div>Caching & Webpack</div>
            <p>
              Caching은 리소스의 내용이 변하지 않은다면 같은 내용을 서버에
              요청할 필요 없이 클라이언트가 사용할 수 있도록 도와준다.{" "}
            </p>
            <p>
              Caching을 사용하면 클라이언트는 서버보다 더 가까운 데이터를 가져올
              수 있기 때문에 훨씬 빨리 사용자에게 리소스를 보여준다.
            </p>
            <p>
              Webpack을 통해 Caching을 효과적으로 사용할 수 있는 방법을
              정리해보자.
            </p>
            <p>
              Webpack을 통해 모듈을 bundle 파일로 만들면 브라우저는 bundle
              파일로 웹어플리케이션을 작동시키는데, 브라우저는 캐싱을 구별하는
              기준은 url이다. 로드하는 리소스의 이름이 같을 경우에는 캐싱을
              사용하기 때문에 만약 파일이 변경될 경우에 수정되지 않은 이전파일을
              보여줄 수 있다. 이런 문제를 방지하기 위해 bundle파일이름에
              해쉬값을 추가할 수 있다. (여기서 중요한건 파일이 번들링될때만
              해쉬값을 변경해주어야 한다.)
            </p>
            <CodeHighlighter type="javascript" content={data.path15} />
            <br />
            <CodeHighlighter type="javascript" content={data.path16} />
            <p>
              hash는 파일이 변경되었을 때, 빌드가 될때마다 부여된다. 참고로 계속
              빌드를 하면 새로생성된 해시값이 적용된 번들 파일이 쌓이게 된다.
              이를 해결하기 위해 불필요한 파일을 삭제해주는 clean-webpack-plugin
              를 사용해보자.
            </p>
            <CodeHighlighter type="javascript" content={data.path17} />
            <div className="sub_box">
              <p>mini-css-extract-plugin</p>
              <p>
                css파일을 html style태그가 아닌 별도의 css 파일로 빼서
                정리해주는 플러그인이다. 우선 css파일을 별도로 만들고, 빌드 시,
                css 파일에서도 hash를 부여해주자. (옵션에 대한 내용은 webpack
                문서에서 검색하면 된다.)
                <a href="https://webpack.js.org/plugins/mini-css-extract-plugin/">
                  웹팩 mini-css-extract-plugin 옵션 설정에 관한 문서
                </a>
              </p>
              <CodeHighlighter type="css" content={data.path18} />
              <p>
                style-loader와 충돌나지 않도록 해당 내용을 지워주고
                mini-css-extract-plugin을 설정해주면 된다.
              </p>
              <p>
                자바스크립트 파일만 수정되고 css파일이 수정되지 않았어도
                [hash].css로 설정을 한다면, 빌드할때 css 파일도 새로운 해시값을
                가진 css파일이 만들어진다. 변경되지 않는 리소스는 cashing를
                해주어야하는데 이러한 방식으로는 제대로 cashing이 이루어지지
                않는다. 이를 해결하기 위해 [contenthash].css 로 설정해준다.
              </p>
              <p>
                {" "}
                contenthash 는 content에 따라 hash값을 부여해준다.(contenthash를
                쓰면 자바스크립트 파일이 수정되어도 css파일이 수정되지 않는다면
                cashing을 할 수 있다.)
              </p>
            </div>
          </div>
          <div className="content_box">
            <div>Chunk & Chunkhash</div>
            <p>
              모듈을 번들링하게 되면 번들파일이 커질 수 있다. 그래서 몇가지
              기준으로 번들파일을 나눌 수 있는데 이를 Chunk라 한다.
            </p>
            <p>
              runtime Chunk: 어플리케이션이 메모리를 할당받고 실행되는 환경을
              런타임 환경이라고 하는데 , 이러한 런타임 환경에서 사용되는
              코드들을 chunk로 분류할 수 있다. 이렇게 분류를하게 되면 runtime때
              사용되는 파일들은 캐싱을 적용할 수 있어, 어플리케이션을 좀더
              빠르게 할 수 있다.
            </p>
            <p>
              vender Chunk: vender란 외부 패키지에 해당하는 모듈인데, 외부에서
              관리되는 모듈들을 chunk로 분류할 수 있다.
            </p>
            <CodeHighlighter type="javascript" content={data.path19} />
            <p>
              index.js에 node_modules에 있는 jquery를 사용하고 번들한 후, 제대로
              나오는지 확인해 보자.
            </p>
            <CodeHighlighter type="javascript" content={data.path21(data)} />
            <p>실제로 번들링한 결과 chunk파일이 생성된다.</p>
            <CodeHighlighter type="html" content={data.path22} />
          </div>
          <div className="content_box">
            <div>Minification & Mangling</div>
            <p>
              리소스들의 양이 커지만 그만큼 시간이 많이 걸리기 때문에 불필요한
              요소를 제거하고 최적화할 수 있도록 소스코드를 압축하고, 코드를
              난독화할수도 있다.
            </p>
            <div className="sub_box">
              <p>html 최적화</p>
              <CodeHighlighter type="javascript" content={data.path23} />
              <p>
                해당 옵션은 webpack 문서나 npm으로 검색하면 옵션 확인 가능!
                <a href="https://github.com/jantimon/html-webpack-plugin#options">
                  옵션 확인
                </a>
              </p>
            </div>
            <div className="sub_box">
              <p>css 및 js 최적화</p>
              <p>
                Optimize CSS Assets Webpack Plugin으로 css파일을 압축할 수
                있는데 Webpack 버전 5 이상에서는 css-minimizer-webpack-plugin를
                사용하면 된다.
              </p>
              <p>
                javascript 같은 경우, Webpack 설치시 ,terser가 자동으로 깔리기
                때문에 이를 사용하는 플러그인만 설치하여 사용해주면
                된다.(terser-webpack-plugin 설치)
              </p>
              <CodeHighlighter type="javascript" content={data.path24} />
              <p>
                <a href="https://github.com/webpack-contrib/css-minimizer-webpack-plugin">
                  css-minimizer-webpack-plugin 참고
                </a>
                <a href="https://webpack.js.org/plugins/terser-webpack-plugin/#root">
                  terser-webpack-plugin 참고
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="box_container">
          <div className="content_box">
            <div className="title">3. Development Mode 와 Production Mode</div>
            <p>
              개발 환경에 따라 다르게 파일을 구분해주기 위해 webpack merge 설치
            </p>
            <CodeHighlighter type="javascript" content="npm i webpack-merge" />
            <p>
              Development 환경과 Production 환경에 공통적으로 사용되는 로직 정리
            </p>
            <CodeHighlighter type="javascript" content={data.path25} />
            <p>Development 환경</p>
            <CodeHighlighter type="javascript" content={data.path26} />
            <p>Production 환경</p>
            <CodeHighlighter type="javascript" content={data.path27} />
            <p>
              환경에 따라 webpack 을 실행시킬 수 있도록 package.json에 명령어를
              추가
            </p>
            <CodeHighlighter type="javascript" content={data.path28} />
            <p>
              참고로 cross-env는 명령줄에 환경변수를 실행시킬수 있는 명령어이다.
              <a href="https://www.npmjs.com/package/cross-env">cross-env</a>
            </p>
          </div>
          <div className="content_box">
            <div>webpack-dev-server</div>
            <p>
              webpack-dev-server로 저장시에도 실시간으로 수정 내역이 저장되도록
              해주어 개발 편의성을 높여준다.
            </p>
            <CodeHighlighter type="javascript" content={data.path29} />
            <p>webpack-dev-server 설정해주기</p>
            <CodeHighlighter type="javascript" content={data.path30} />
          </div>
          <div className="content_box">
            <div>file-loader</div>
            <p>webpack은 이미지같은 정적 데이터도 모듈로 다룰 수 있다.</p>
            <CodeHighlighter type="javascript" content={data.path31} />
            <p>
              이렇게 development 환경에서는 알아보기 쉽도록 파일경로로 이름을
              지정해주고, production 환경에서는 hash값으로 파일이름을
              지정해준다.
            </p>
            <CodeHighlighter type="javascript" content={data.path32} />
          </div>
          <div className="content_box">
            <div>url-loader</div>
            <p>
              url-loader는 작은 이미지 같은 리소스들을 문자열로 변환해주는
              역할을 한다. 인라인 형태로 적용되는 리소스이다.
            </p>
            <p>
              참고로 url-loader가 작동되지 않을경우, default로 file-loader가
              실행된다.
            </p>
            <CodeHighlighter type="javascript" content={data.path33} />
          </div>
          <div className="content_box">
            <p>sass-loader</p>
            <CodeHighlighter type="javascript" content={data.path34} />
            <p>
              참고로 node 환경에서 sass를 사용하려면 node-sass를
              설치해주어야한다
            </p>
            <CodeHighlighter type="javascript" content="npm i node-sass" />
            <CodeHighlighter type="javascript" content={data.path35} />
            <p>
              참고로 sass 파일 관리 팁은 해당 링크 참고!
              <a href="https://www.learnhowtoprogram.com/user-interfaces/building-layouts-preprocessors/7-1-sass-architecture">
                7-1 sass
              </a>
            </p>
          </div>
          <div className="content_box">
            <p>postCSS</p>
            <p>postCSS는 css를 위해 사용되는 도구이다.</p>
            <p>
              자바스크립트 플러그인을 추가해서 css를 원하는 목적으로 변환시키고
              적용시킬 수 있다.
              <a href="https://postcss.org/">postcss</a>
            </p>
            <p>postcss로 prefixer 적용시키기</p>
            <CodeHighlighter type="javascript" content={data.path36} />
            <CodeHighlighter type="javascript" content={data.path37} />
            <CodeHighlighter type="javascript" content={data.path38} />
          </div>
          <div className="content_box">
            <p>browerslist</p>
            <p>browerslist란 지원하고자 하는 브라우저 리스트를 말한다.</p>
            <p>
              package.json에 추가
              <a href="https://github.com/browserslist/browserslist#readme">
                browerslist 공식문서 참고
              </a>
            </p>
            <CodeHighlighter type="javascript" content="npm i browerslist" />
            <CodeHighlighter type="javascript" content={data.path39} />
          </div>
          <div className="content_box">
            <p>babel</p>
            <p>babel을 웹팩에 적용</p>
            <CodeHighlighter type="javascript" content={data.path40} />
            <CodeHighlighter type="javascript" content={data.path41} />
            <CodeHighlighter type="javascript" content={data.path42} />
            <p>babel polyfill 추가로 적용</p>
            <CodeHighlighter
              type="javascript"
              content="npm i @babel/polyfill"
            />
            <CodeHighlighter type="javascript" content={data.path43} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicWebpack;
