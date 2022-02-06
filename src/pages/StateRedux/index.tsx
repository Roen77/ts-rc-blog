import CodeHighlighter from '@components/CodeHighlighter';
import React from 'react';
import './StateRedux.css';
function StateRedux() {
  const actionTypeContent = `// api 호출 함수
  import { requestMovies } from "../api/movie";

  const GET_MOVIES = "GET_MOVIES";
  const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
  const GET_MOVIES_ERROR = "GET_MOVIES_ERROR";

  const GET_MOVIE = "GET_MOVIE";
  const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS";
  const GET_MOVIE_ERROR = "GET_MOVIE_ERROR";`;
  const reuxThunkContent = `// 영화 api를 호출하여 영화 데이터를 가져온다.
  export const getMovies = () => async (dispatch) => {
    dispatch({ type: GET_MOVIES });
    try {
      const movies = await requestMovies();
      dispatch({ type: GET_MOVIES_SUCCESS, movies: movies?.data });
    } catch (error) {
      dispatch({ type: GET_MOVIES_ERROR, error });
    }
  };
  // 영화 api를 호출하여 해당 id에 해당하는 영화 데이터를 가져온다.
  export const getMovie = (id) => async (dispatch) => {
    dispatch({ type: GET_MOVIE });
    try {
      const movie = await requestMovies(id);
      dispatch({ type: GET_MOVIE_SUCCESS, movie });
    } catch (error) {
      dispatch({ type: GET_MOVIE_ERROR, error });
    }
  };
  // 참고로 redux-thunk는 첫번째인자로 dispatch를 받고 두번째인자로 getState를 받는데 두번째인자로 state값을 가져올수 있다.`;
  const stateContent = `// api를 호출하여 데이터를 가져오므로, loading,data,error 세가지 상태로 정리
  const initialState = {
    movies: {
      loading: false,
      data: null,
      error: null,
    },
    movie: {
      loading: false,
      data: null,
      error: null,
    },
  };`;
  const reducerContent = `export default function movies(state = initialState, action) {
    switch (action.type) {
      case GET_MOVIES:
        return {
          ...state,
          movies: {
            loading: true,
            data: null,
            error: null,
          },
        };
      case GET_MOVIES_SUCCESS:
        return {
          ...state,
          movies: {
            loading: false,
            data: action.movies,
            error: null,
          },
        };
      case GET_MOVIES_ERROR:
        return {
          ...state,
          movies: {
            loading: false,
            data: null,
            error: action.error,
          },
        };
      case GET_MOVIE:
        return {
          ...state,
          movie: {
            loading: true,
            data: null,
            error: null,
          },
        };
      case GET_MOVIE_SUCCESS:
        return {
          ...state,
          movie: {
            loading: false,
            data: action.movies,
            error: null,
          },
        };
      case GET_MOVIE_ERROR:
        return {
          ...state,
          movie: {
            loading: false,
            data: null,
            error: action.error,
          },
        };
      default:
        return state;
    }
  }`;
  const utilsReduxtext = '[`${type}_SUCCESS`, `${type}_ERROR`]';
  const utilsRedux = `// lib/asyncUtils.js
  // thunk 유틸함수로 action을 dispatch하는 함수를 리턴해준다.
  export const createPromiseThunk = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [${utilsReduxtext}];
    return (param) => async (dispatch) => {
      //요청 시작
      dispatch({ type });
      try {
        const payload = await promiseCreator(param);
        dispatch({ type: SUCCESS, payload });
      } catch (error) {
        dispatch({ type: ERROR, payload: error, error: true });
      }
    };
  };`;
  const utilsState = `// lib/asyncUtils.js
  // state 유틸 함수
  export const reducerUtils = {
    initial: (data = null) => ({
      loading: false,
      data,
      error: null,
    }),
    loading: (prevState = null) => ({
      loading: true,
      data: prevState,
      error: null,
    }),
    success: (data) => ({
      loading: false,
      data,
      error: null,
    }),
    error: (error) => ({
      loading: false,
      data: null,
      error,
    }),
  };`;
  const utilsReducer = `// lib/asyncUtils.js
  // reducer 유틸 함수
  export const handleAsyncActions = (type, key, keepData) => {
    const [SUCCESS, ERROR] = [${utilsReduxtext}];
    return (state, action) => {
      switch (action.type) {
        case type:
          return {
            ...state,
            // 사용자 경험 개선을 위해 로딩할때 기존 데이터를 넣을지 안넣을지 확인
            [key]: reducerUtils.loading(keepData ? state[key]?.data : null),
          };
        case SUCCESS:
          return {
            ...state,
            [key]: reducerUtils.success(action.payload),
          };
        case ERROR:
          return {
            ...state,
            [key]: reducerUtils.error(action.payload),
          };
        default:
          return state;
      }
    };
  };`;
  const reduxrf = `// modules/movies.js
  // api 호출
  import { requestMovies, requstMovie } from "../api/movie";
  import {
    createPromiseThunk,
    handleAsyncActions,
    reducerUtils,
  } from "../lib/asyncUtils";

  // 액션 타입
  const GET_MOVIES = "GET_MOVIES";
  const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
  const GET_MOVIES_ERROR = "GET_MOVIES_ERROR";

  const GET_MOVIE = "GET_MOVIE";
  const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS";
  const GET_MOVIE_ERROR = "GET_MOVIE_ERROR";

  // redux-thunk
  export const getMovies = createPromiseThunk(GET_MOVIES, requestMovies);
  export const getMovie = createPromiseThunk(GET_MOVIE, requstMovie);

  // state
  const initialState = {
    movies: reducerUtils.initial(),
    movie: reducerUtils.initial(),
  };

  // reducer
  const getMoviesReducer = handleAsyncActions(GET_MOVIES, "movies", true);
  const getMovieReducer = handleAsyncActions(GET_MOVIE, "movie", true);

  export default function movies(state = initialState, action) {
    switch (action.type) {
      case GET_MOVIES:
      case GET_MOVIES_SUCCESS:
      case GET_MOVIES_ERROR:
        return getMoviesReducer(state, action);
      case GET_MOVIE:
      case GET_MOVIE_SUCCESS:
      case GET_MOVIE_ERROR:
        return getMovieReducer(state, action);
      default:
        return state;
    }
  }
  `;
  const componentUseRedux = `function MovieList() {
    const { loading, data, error } = useSelector((state) => state.movies.movies);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getMovies());
    }, [dispatch]);

    if (loading)
      return (
        <div>
          <h1>...로딩중</h1>
        </div>
      );
    if (error) return <div>에러</div>;
    if (!data) return null;
    const { Search } = data.data;
    return (
      <>
        {Search.map((movie) => (
          <Link key={movie.imdbID} to={movie.imdbID}>
            <MovieItem movie={movie} />
          </Link>
        ))}
      </>
    );
  }

  export default MovieList;`;
  const fixReducer = `// modules/movies.js
  // 3번째인자를 true로 설정하여 로딩시 기존데이터를 넣어준다.
  const getMoviesReducer = handleAsyncActions(GET_MOVIES, "movies", true);`;
  const fix1 = `function MovieList() {
    const { loading, data, error } = useSelector((state) => state.movies.movies);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getMovies());
    }, [dispatch]);
    //이 부분 수정
    if (loading && !data)
      return (
        <div>
          <h1>...로딩중</h1>
        </div>
      );....`;
  const fix3 = `// modules/movies.js
   // 데이터 초기화
   const RESET_DATA = "RESET_DATA";

   export const resetData = () => ({ type: RESET_DATA });

   export default function movies(state = initialState, action) {
       switch (action.type) {
           ...
       // 기존 데이터 초기화
         case RESET_DATA:
           return {
             ...state,
             movie: reducerUtils.initial(),
           };
         default:
           return state;
       }
     }
   `;
  const fix4 = `  //  MoviePage 컴포넌트
   useEffect(() => {
     dispatch(getMovie(id));
     // 뒷정리 함수를 통해 데이터 초기화!
     return () => {
       dispatch(resetData());
     };
   }, [dispatch, id]);`;
  const fix5 = `/*
  기존에 state에 저장된 내용
  movie:{
      loading(pin):false
      data(pin):null
      error(pin):null
  }

  id로 데이터 저장
  movie:{
     tt0101:{
          loading(pin):false
          data(pin):null
          error(pin):null
     },
      tt0102:{
      loading(pin):false
      data(pin):null
      error(pin):null
      },
      ...
  }

  id로 데이터 저장해주는걸로 수정하기
   */`;
  const fix6 = `// lib/asyncUtils.js
  // id를 리턴해주는 함수
  const defaultIdSelector = (param) => param;
  export const createPromiseThunkById = (
    type,
    promiseCreator,
    idSelector = defaultIdSelector
  ) => {
    const [SUCCESS, ERROR] = [${utilsReduxtext}];
    return (param) => async (dispatch) => {
      const id = idSelector(param);
      //요청 시작
      dispatch({ type, meta: id });
      try {
        const payload = await promiseCreator(param);
        dispatch({ type: SUCCESS, payload, meta: id });
      } catch (error) {
        dispatch({ type: ERROR, payload: error, error: true, meta: id });
      }
    };
  };

  export const handleAsyncActionsById = (type, key, keepData) => {
      const [SUCCESS, ERROR] = [${utilsReduxtext}];
      return (state, action) => {
        const id = action.meta;
        switch (action.type) {
          case type:
            return {
              ...state,
              // 사용자 경험 개선을 위해 로딩할때 기존 데이터를 넣을지 안넣을지 확인
              [key]: {
                ...state[key],
                [id]: reducerUtils.loading(
                  keepData ? state[key]?.[id]?.data : null
                ),
              },
            };
          case SUCCESS:
            return {
              ...state,
              [key]: {
                ...state[key],
                [id]: reducerUtils.success(action.payload),
              },
            };
          case ERROR:
            return {
              ...state,
              [key]: {
                ...state[key],
                [id]: reducerUtils.error(action.payload),
              },
            };
          default:
            return state;
        }
      };
    };`;
  const fix7 = `// modules/movies.js
    export const getMovie = createPromiseThunkById(GET_MOVIE, requstMovie);

    const getMovieReducer = handleAsyncActionsById(GET_MOVIE, "movie", true);`;
  const fix8 = `function MoviePage() {
    const { id } = useParams();
    const { loading, data, error } = useSelector(
      (state) => state.movies.movie[id] || reducerUtils.initial()
    );
    const dispatch = useDispatch();
    //  MoviePage 컴포넌트
    useEffect(() => {
      dispatch(getMovie(id));
      // 뒷정리 함수해줄 필요 없다.
      // return () => {
      //   dispatch(resetData());
      // };
    }, [dispatch, id]);

    if (loading && !data)
      return (
        <div>
          <h1>...로딩중</h1>
        </div>
      );
    if (error) return <div>에러</div>;
    if (!data) return null;
    return (
      <div>
        <MovieItem movie={data.data} />
      </div>
    );
  }

  export default MoviePage;`;
  const reduxSagaContent = `// 리덕스 사가는 액션 타입 함수를 만들고 사가함수를 만들어주어야한다.
  export const getMovies = () => ({ type: GET_MOVIES });
  export const getMovie = (id) => ({ type: GET_MOVIE, payload: id, meta: id });

  function* getMoviesSaga() {
    try {
      // api호출은 call
      const movies = yield call(requestMovies);
      // 액션을 불러일으키는건 put
      yield put({ type: GET_MOVIES_SUCCESS, payload: movies });
    } catch (error) {
      yield put({ type: GET_MOVIES_ERROR, payload: error, error: true });
    }
  }
  // saga함수는 action을 인자로받아 payload를 가져올 수 있다.
  function* getMovieSaga(action) {
    const id = action.payload;
    try {
      // api호출은 call
      const movie = yield call(requstMovie, id);
      // 액션을 불러일으키는건 put
      yield put({ type: GET_MOVIE_SUCCESS, payload: movie, meta: id });
    } catch (error) {
      yield put({
        type: GET_MOVIE_ERROR,
        payload: error,
        error: true,
        meta: id,
      });
    }
  }

  // saga함수를 묶는 함수 만들기
  export function* moviesSaga() {
    yield takeEvery(GET_MOVIES, getMoviesSaga);
    yield takeEvery(GET_MOVIE, getMovieSaga);
  }`;
  const rootReducerContent = `// modules/index.js
  import { combineReducers } from "redux";
  import movies, { moviesSaga } from "./movie";
  const rootReducer = combineReducers({
    movies,
  });

  export default rootReducer;
  `;
  const reduxconnect = `// index.js
  import { applyMiddleware, createStore } from "redux";
  import { composeWithDevTools } from "redux-devtools-extension";
  import ReduxThunk from "redux-thunk";
  import { Provider } from "react-redux";
  import rootReducer from "./modules";

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );`;
  const rootReducerSagaContent = `import { combineReducers } from "redux";
  import { all } from "redux-saga/effects";
  import movies, { moviesSaga } from "./movie";
  const rootReducer = combineReducers({
    movies,
  });

  // rootSaga 생성
  export function* rootSaga() {
    yield all([moviesSaga()]);
  }

  export default rootReducer;
  `;
  const reduxSagaconnect = `import { BrowserRouter } from "react-router-dom";
  import { applyMiddleware, createStore } from "redux";
  import rootReducer, { rootSaga } from "./modules";
  import { composeWithDevTools } from "redux-devtools-extension";
  import { Provider } from "react-redux";
  import createSagaMiddleware from "@redux-saga/core";

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(rootSaga);

  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );`;
  const utilsReduxSaga = `// lib/asyncUtils.js
  export const createPromiseSaga = (type, promiseCreator) => {
    const [SUCCESS, ERROR] = [${utilsReduxtext}];
    return function* saga(action) {
      try {
        const result = yield call(promiseCreator, action.payload);
        yield put({ type: SUCCESS, payload: result });
      } catch (error) {
        yield put({ type: ERROR, payload: error, error: true });
      }
    };
  };
  // lib/asyncUtils.js
  export const createPromiseSagaById = (type, promiseCreator) => {
    const [SUCCESS, ERROR] =[${utilsReduxtext}];
    return function* saga(action) {
      const id = action.meta;
      try {
        const result = yield call(promiseCreator, action.payload);
        yield put({ type: SUCCESS, payload: result, meta: id });
      } catch (error) {
        yield put({ type: ERROR, payload: error, error: true, meta: id });
      }
    };
  };`;
  const reduxrfSaga = `// modules/movies.js
  // api 호출
  import { requestMovies, requstMovie } from "../api/movie";
  import {
    createPromiseSaga,
    createPromiseSagaById,
    handleAsyncActions,
    handleAsyncActionsById,
    reducerUtils,
  } from "../lib/asyncUtils";
  import { takeEvery } from "redux-saga/effects";

  // 액션 타입
  const GET_MOVIES = "GET_MOVIES";
  const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
  const GET_MOVIES_ERROR = "GET_MOVIES_ERROR";

  const GET_MOVIE = "GET_MOVIE";
  const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS";
  const GET_MOVIE_ERROR = "GET_MOVIE_ERROR";

  // modules/movies.js
  // 데이터 초기화
  const RESET_DATA = "RESET_DATA";

  // 리덕스 사가는 액션 타입 함수를 만들고 사가함수를 만들어주어야한다.
  export const getMovies = () => ({ type: GET_MOVIES });
  export const getMovie = (id) => ({ type: GET_MOVIE, payload: id, meta: id });

  const getMoviesSaga = createPromiseSaga(GET_MOVIES, requestMovies);
  const getMovieSaga = createPromiseSagaById(GET_MOVIE, requstMovie);

  // saga함수를 묶는 함수 만들기
  export function* moviesSaga() {
    yield takeEvery(GET_MOVIES, getMoviesSaga);
    yield takeEvery(GET_MOVIE, getMovieSaga);
  }

  export const resetData = () => ({ type: RESET_DATA });
  // state
  const initialState = {
    movies: reducerUtils.initial(),
    movie: reducerUtils.initial(),
  };

  // reducer

  // modules/movies.js
  // 3번째인자를 true로 설정하여 로딩시 기존데이터를 넣어준다.
  const getMoviesReducer = handleAsyncActions(GET_MOVIES, "movies", true);
  const getMovieReducer = handleAsyncActionsById(GET_MOVIE, "movie", true);

  export default function movies(state = initialState, action) {
    switch (action.type) {
      case GET_MOVIES:
      case GET_MOVIES_SUCCESS:
      case GET_MOVIES_ERROR:
        return getMoviesReducer(state, action);
      case GET_MOVIE:
      case GET_MOVIE_SUCCESS:
      case GET_MOVIE_ERROR:
        return getMovieReducer(state, action);
      case RESET_DATA:
        return {
          ...state,
          movie: reducerUtils.initial(),
        };
      default:
        return state;
    }
  }
  `;
  return (
    <div>
      <div className="r_con" id="js_redux">
        <h2>리덕스</h2>
        <p>
          <a href="https://redux.js.org/" target="_blank">
            redux
          </a>
          란 react에서 사용하는 상태관리 라이브러리이다.
        </p>
        <div>redux를 사용하여 영화 api를 호출하여 화면에 보여주는 예시를 통해 정리해보자!</div>
        <div className="box_container">
          <h3>1. 리덕스</h3>
          <div className="content_box">
            <h4>- 기본</h4>
            <div>리덕스 파일 생성</div>
            <CodeHighlighter type="javascript" content="modules 폴더 생성" />
          </div>
          <div className="content_box">
            <h4>- reudx-thunk와 사용</h4>
            <div className="title">1. 액션 타입 정의</div>
            <CodeHighlighter type="javascript" content={actionTypeContent} />
          </div>
          <div className="content_box">
            <div className="title">2.redux-thunk 함수 생성</div>
            <p>redux-thunk는 액션을 dispatch하는 함수를 리턴해준다.</p>
            <CodeHighlighter type="javascript" content={reuxThunkContent} />
          </div>
          <div className="content_box">
            <div className="title">3. 초기 상태 설정</div>
            <p>초기 state 설정</p>
            <CodeHighlighter type="javascript" content={stateContent} />
          </div>
          <div className="content_box">
            <div className="title">4. reducer 설정</div>
            <p>reducer 함수 생성</p>
            <CodeHighlighter type="javascript" content={reducerContent} />
          </div>
          <div className="content_box">
            <div className="title">5. rootReducer 생성</div>
            <p>reducer 함수 생성</p>
            <CodeHighlighter type="javascript" content={rootReducerContent} />
          </div>
          <div className="content_box">
            <div className="title">6. 컴포넌트에서 redux 사용하도록 redux 연결</div>
            <p>reducer 함수 생성</p>
            <CodeHighlighter type="javascript" content={reduxconnect} />
          </div>
        </div>
        <div>
          <p>반복되는 코드가 많고 유지보수성을 위해 utils함수를 만들어 리팩토링해보자!</p>
        </div>
        <div className="box_container">
          <h3>2. 리팩토링</h3>
          <div className="content_box">
            <h4>- 기본</h4>
            <div>유틸 함수를 만들어 위의 내용 리팩토링하기</div>
            <CodeHighlighter type="javascript" content="lib 폴더 생성" />
          </div>
          <div className="content_box">
            <div className="title">1. redux-thunk 유틸 함수 생성</div>
            <CodeHighlighter type="javascript" content={utilsRedux} />
          </div>
          <div className="content_box">
            <div className="title">2.state 유틸 함수 생성</div>
            <CodeHighlighter type="javascript" content={utilsState} />
          </div>
          <div className="content_box">
            <div className="title">3. reducer 유틸 함수 생성</div>
            <p>초기 state 설정</p>
            <CodeHighlighter type="javascript" content={utilsReducer} />
          </div>
          <div className="content_box">
            <div className="title">4. utils 함수 적용하여 리팩토링한 결과</div>
            <CodeHighlighter type="javascript" content={reduxrf} />
          </div>
          <div className="content_box">
            <div className="title">5. 컴포넌트에서 redux 사용</div>
            <CodeHighlighter type="javascript" content={componentUseRedux} />
          </div>
        </div>
        <div className="box_container">
          <h3>3. 사용자 경험을 개선-1</h3>
          <div className="content_box">
            <h4>- 이미 불러온 데이터가 있을때 로딩화면을 보여주지 않기.</h4>
            <div>처음 데이터가 없을때만 로딩화면을 보여주고, 그 이후 데이터가 있다면 로딩화면을 보여주지 않기.</div>
            <div>handleAsyncActions 함수의 3번째인자로 keepData를 받아 기존데이터를 유지시키는 인자를 받는다.</div>
            <CodeHighlighter type="javascript" content={fixReducer} />
          </div>
          <div className="content_box">
            <div>컴포넌트에서 redux사용시, loading 뿐 아니라 data가 없을 경우에만 보여주도록 수정</div>
            <CodeHighlighter type="javascript" content={fix1} />
          </div>
        </div>
        <div className="box_container">
          <h3>3. 사용자 경험을 개선-2</h3>
          <div className="content_box">
            <h4>- 기존 데이터 초기화</h4>
            <div>- 라우터가 변경되어 화면이 랜더링될 때, 기존 데이터가 보여지지 않도록 초기화 시켜주기.</div>
            <div>데이터를 초기화시켜주는 reducer를 만들어 사용.</div>
            <CodeHighlighter type="javascript" content={fix3} />
          </div>
          <div className="content_box">
            <div>useEffect를 통해 뒷정리해주기!(데이터 초기화)</div>
            <CodeHighlighter type="javascript" content={fix4} />
          </div>
        </div>
        <div className="box_container">
          <h3>3. 사용자 경험을 개선-3</h3>
          <div className="content_box">
            <h4>- 이미 불러온 데이터가 있을때 로딩화면을 보여주지 않기.</h4>
            <div>
              사용자 경험을 개선하면서 기존 데이터가 불러올 때 데이터가 이미 있다면 기존 데이터를 보여주고, 그렇지
              않다면 로딩화면을 보여주도록 수정하고, 기존 데이터가 보여지지 않도록 데이터를 초기화해주었습니다.
            </div>
            <div>
              이 과정을 통해, 화면이 랜더링 될때 useEffect 함수를 이용해 뒷정리 함수를 호출하여 데이터를 초기화시켜주는
              과정에서 라우터가 변경되거나 했을때 다시 로딩화면이 보여지게 됩니다.
            </div>
            <div>좀 더 사용자 경험 개선을 위해 redux를 리팩토링 해보자.</div>
            <CodeHighlighter type="javascript" content={fix5} />
          </div>
          <div className="content_box">
            <div>utils 함수 수정</div>
            <CodeHighlighter type="javascript" content={fix6} />
          </div>
          <div className="content_box">
            <div>utils 함수 사용</div>
            <CodeHighlighter type="javascript" content={fix7} />
          </div>
          <div className="content_box">
            <div>컴포넌트에서 redux 사용</div>
            <CodeHighlighter type="javascript" content={fix8} />
          </div>
        </div>
      </div>
      <div className="r_con" id="js_redux2">
        <div className="box_container">
          <div className="content_box">
            <h4>- reudx-saga와 사용</h4>
            <div className="title">1. 액션 타입 정의</div>
            <CodeHighlighter type="javascript" content={actionTypeContent} />
          </div>
          <div className="content_box">
            <div className="title">2.redux-saga 함수 생성</div>
            <p>redux-saga함수 생성</p>
            <CodeHighlighter type="javascript" content={reduxSagaContent} />
          </div>
          <div className="content_box">
            <div className="title">3. 초기 상태 설정</div>
            <p>초기 state 설정</p>
            <CodeHighlighter type="javascript" content={stateContent} />
          </div>
          <div className="content_box">
            <div className="title">4. reducer 설정</div>
            <p>reducer 함수 생성</p>
            <CodeHighlighter type="javascript" content={reducerContent} />
          </div>
          <div className="content_box">
            <div className="title">5. rootReducer 생성</div>
            <p>reducer 함수 생성</p>
            <CodeHighlighter type="javascript" content={rootReducerSagaContent} />
          </div>
          <div className="content_box">
            <div className="title">6. 컴포넌트에서 redux 사용하도록 redux 연결</div>
            <p>reducer 함수 생성</p>
            <CodeHighlighter type="javascript" content={reduxSagaconnect} />
          </div>
        </div>
        <div>
          <p>반복되는 코드가 많고 유지보수성을 위해 utils함수를 만들어 리팩토링해보자!</p>
        </div>
        <div className="box_container">
          <h3>2. 리팩토링</h3>
          <div className="content_box">
            <h4>- 기본</h4>
            <div>유틸 함수를 만들어 위의 내용 리팩토링하기</div>
            <CodeHighlighter type="javascript" content="lib 폴더 생성" />
          </div>
          <div className="content_box">
            <div className="title">1. redux-saga 유틸 함수 생성</div>
            <CodeHighlighter type="javascript" content={utilsReduxSaga} />
          </div>
          <div className="content_box">
            <div className="title">2.state 유틸 함수 생성</div>
            <CodeHighlighter type="javascript" content={utilsState} />
          </div>
          <div className="content_box">
            <div className="title">3. reducer 유틸 함수 생성</div>
            <p>초기 state 설정</p>
            <CodeHighlighter type="javascript" content={utilsReducer} />
          </div>
          <div className="content_box">
            <div className="title">4. utils 함수 적용하여 리팩토링한 결과</div>
            <CodeHighlighter type="javascript" content={reduxrfSaga} />
          </div>
          <div className="content_box">
            <div className="title">5. 컴포넌트에서 redux 사용</div>
            <CodeHighlighter type="javascript" content={componentUseRedux} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StateRedux;
