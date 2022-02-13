import CodeHighlighter from "@components/CodeHighlighter";
import React from "react";
import "./StateRedux.css";
function ReduxTool() {
  const actionTypeContent = `// api 호출 함수
  import { requestMovies } from "../api/movie";

  const GET_MOVIES = "GET_MOVIES";
  const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
  const GET_MOVIES_ERROR = "GET_MOVIES_ERROR";

  const GET_MOVIE = "GET_MOVIE";
  const GET_MOVIE_SUCCESS = "GET_MOVIE_SUCCESS";
  const GET_MOVIE_ERROR = "GET_MOVIE_ERROR";`;
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
  // eslint-disable-next-line no-template-curly-in-string
  const utilsReduxtext = "[`${type}_SUCCESS`, `${type}_ERROR`]";
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
  const con1 = `npm i redux react-redux redux-saga redux-thunk typesafe-actions`;
  const con2 = `// modules/counter.ts
// ducks패턴 즉 액션타입 ,액션생성함수, 리듀서를 모두 한파일에 작성하겠다라는 의미이다.`;
  const con3 = `// modules/counter.ts
  import { createAction, ActionType, createReducer } from "typesafe-actions";

  export const increase = createAction("counter/INCREASE")();
  export const decrease = createAction("counter/DECREASE")();
  // 제너릭타입으로 <payload,meta> 이 값을 지정해줄 수 있다. payload로 number가 온다는 말
  export const increaseBy = createAction("counter/INCREASE_BY")<number>();`;
  const con4 = `  const INCREASE = "counter/INCREASE";
  const DECREASE = "counter/DECREASE";
  const INCREASE_BY = "counter/INCREASE_BY";
  export const increase = () => ({ type: INCREASE });
  export const decrease = () => ({ type: DECREASE });
  export const increaseBy = (payload) => ({ type: INCREASE_BY, payload });`;
  const con5 = `// action 타입 생성해주기
  const actions = { increase, decrease, increaseBy };
  type CounterAction = ActionType<typeof actions>;`;
  const con6 = `// 2.state 선언(초기상태 선언)
  // state 타입 정의
  type CounterState = {
    count: number;
  };
  // state 초기 선언
  const initialState: CounterState = {
    count: 0,
  };`;
  const con7 = `// 리듀서 생성
  const counter = createReducer<CounterState, CounterAction>(initialState)
    .handleAction(increase, (state) => ({ count: state.count + 1 }))
    .handleAction(decrease, (state) => ({ count: state.count - 1 }))
    .handleAction(increaseBy, (state, action) => ({
      count: state.count + action.payload,
    }));`;
  const con8 = `// modules/counter.ts
  // ducks패턴 즉 액션타입 ,액션생성함수, 리듀서를 모두 한파일에 작성하겠다라는 의미이다.

  import { createAction, ActionType, createReducer } from "typesafe-actions";

  // 1. 액션 생성함수 선언
  // modules/counter.ts
  export const increase = createAction("counter/INCREASE")();
  export const decrease = createAction("counter/DECREASE")();
  // 제너릭타입으로 <payload,meta> 이 값을 지정해줄 수 있다. payload로 number가 온다는 말
  export const increaseBy = createAction("counter/INCREASE_BY")<number>();

  // action 타입 생성해주기
  const actions = { increase, decrease, increaseBy };
  type CounterAction = ActionType<typeof actions>;

  // 2.state 선언(초기상태 선언)
  // state 타입 정의
  type CounterState = {
    count: number;
  };
  // state 초기 선언
  const initialState: CounterState = {
    count: 0,
  };

  // 리듀서 생성
  const counter = createReducer<CounterState, CounterAction>(initialState)
    .handleAction(increase, (state) => ({ count: state.count + 1 }))
    .handleAction(decrease, (state) => ({ count: state.count - 1 }))
    .handleAction(increaseBy, (state, action) => ({
      count: state.count + action.payload,
    }));
  // 리듀서 함수 내보내주기
  export default counter;`;
  const con9 = `// modules/index.ts
  // root 리듀서 생성
  import { combineReducers } from "redux";
  import counter from "./counter";
  const rootReducer = combineReducers({
    counter,
  });

  export default rootReducer;

  // 루트 리듀서의 반환값을 유추할수있도록 내보내주기
  export type RootState = ReturnType<typeof rootReducer>;`;
  const con10 = `// index.ts
  import { createStore } from "redux";
  import rootReducer from "./modules";
  import { Provider } from "react-redux";
  import { composeWithDevTools } from "@redux-devtools/extension";

  const store = createStore(rootReducer, composeWithDevTools());

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );`;
  const con11 = `// modules/todos.ts
  import { ActionType, createAction, createReducer } from "typesafe-actions";

  // 1.액션 생성 함수 및 액션 타입 정하기
  let nextId = 1;
  // payload 타입을 Todo로 지정해주고 payload값을 객체형식으로 적어줌
  export const addTodo = createAction("todos/ADD_TODO", (text: string) => ({
    id: nextId++,
    text: text,
    done: false,
  }))<Todo>();
  export const toggleTodo = createAction("todos/TOGGLE_TODO")<number>();
  export const removeTodo = createAction("todos/REMOVE_TODO")<number>();

  // 액션 타입 정하기
  const actions = { addTodo, toggleTodo, removeTodo };
  type TodosAction = ActionType<typeof actions>;

  // 2.state 타입 및 state 초기화
  export type Todo = {
    id: number;
    text: string;
    done: boolean;
  };
  export type TodosState = Todo[];

  // 초기 상태 선언
  const initialState: TodosState = [];

  // 3. 리듀서 작성
  const todos = createReducer<TodosState, TodosAction>(initialState)
    .handleAction(removeTodo, (state, action) =>
      state.filter((todo) => todo.id !== action.payload)
    )
    .handleAction(toggleTodo, (state, action) =>
      state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : { ...todo }
      )
    )
    .handleAction(addTodo, (state, action) =>
      state.concat({ ...action.payload })
    );

  export default todos;
  `;
  const con12 = `// modules/todos/action.ts
  import { createAction } from "typesafe-actions";
  import { Todo } from "./types";

  let nextId = 1; // 새로운 항목을 추가 할 때 사용 할 고유 ID 값

  // 액션 생성 함수

  // 이 액션 생성 함수의 경우엔 파라미터를 기반하여 커스터마이징된 payload를 설정해주므로,
  // createAction 이라는 함수를 사용합니다.
  // 여기서 action은 액션 객체를 만드는 함수입니다
  export const addTodo = createAction("todos/ADD_TODO", (text: string) => ({
    id: nextId++,
    text: text,
    done: false,
  }))<Todo>();
  // 위 코드는 다음과 같은 형태로도 구현 할 수 있지만, createAction 말고 action 만 사용하면
  // Action Helpers (https://www.npmjs.com/package/typesafe-actions#action-helpers-api) 지원이 안됩니다.
  // export const addTodo = (text: string) => action(ADD_TODO, { id: nextId++, text })

  // payload가 그대로 들어가는 액션생성함수는 정말 간단합니다.
  export const toggleTodo = createAction("todos/TOGGLE_TODO")<number>();
  export const removeTodo = createAction("todos/REMOVE_TODO")<number>();
  `;
  const con13 = `// modules/todos/types.ts
  import { ActionType } from "typesafe-actions";
  import * as actions from "./actions";

  // 한번에 모두 import 해와서 actions 에 담았기 때문에
  // 이 부분이 액션의 종류가 만하져도 한 줄로 작성 할 수 있어서 매우 간편합니다.
  export type TodosAction = ActionType<typeof actions>;

  // 상태에서 사용 할 할 일 항목 데이터 타입 정의
  export type Todo = {
    id: number;
    text: string;
    done: boolean;
  };

  // 이 모듈에서 관리할 상태는 Todo 객체로 이루어진 배열
  export type TodosState = Todo[];
  `;
  const con14 = `// modules/todos/reducer.ts
  import { createReducer } from "typesafe-actions";
  import { addTodo, removeTodo, TodosState, toggleTodo } from "../todos";
  import { TodosAction } from "./types";

  // 초기 state 선언
  const initialState: TodosState = [];
  const reducer = createReducer<TodosState, TodosAction>(initialState)
    .handleAction(removeTodo, (state, action) =>
      state.filter((todo) => todo.id !== action.payload)
    )
    .handleAction(toggleTodo, (state, action) =>
      state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : { ...todo }
      )
    )
    .handleAction(addTodo, (state, action) =>
      state.concat({ ...action.payload })
    );
  export default reducer;
  `;
  const con15 = `// modules/todos/index.ts
  // 리듀서를 불러와서 default로 내보내겠다는 의미
  export { default } from "./reducer";
  // 모든 action 생성 함수를 불러와서 같은 이름들로 내부내겠다는 의미
  export * from "./actions";
  export * from "./types";

  //  덕스 타입은 리듀서만 디폴트로 내보냄`;
  const con16 = `// modules/index.ts
  import todos from "./todos/reducer";
  // root 리듀서 생성
  import { combineReducers } from "redux";
  import counter from "./counter";
  const rootReducer = combineReducers({
    counter,
    todos,
  });

  export default rootReducer;

  // 루트 리듀서의 반환값을 유추할수있도록 내보내주기
  export type RootState = ReturnType<typeof rootReducer>;`;
  const con17 = `// TodoApp.tsx
  import React, { ChangeEvent, FormEvent, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { RootState } from "../modules";
  import { addTodo, removeTodo, toggleTodo } from "../modules/todos";
  import TodoItem from "./TodoItem";

  function TodoApp() {
    const [value, setValue] = useState("");
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch = useDispatch();
    const onInsert = (text: string) => {
      dispatch(addTodo(text));
    };
    const onToggle = (id: number) => {
      dispatch(toggleTodo(id));
    };
    const onRemove = (id: number) => {
      dispatch(removeTodo(id));
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    };
    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      onInsert(value);
      setValue("");
    };

    const renderList = (
      <ul>
        {todos.map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>
    );
    return (
      <div>
        <form onSubmit={onSubmit}>
          <input
            placeholder="할일 입력"
            onChange={onChange}
            value={value}
          ></input>
          <button type="submit">등록</button>
        </form>
        <div>
          {todos.length === 0 ? <p>등록되 할일이 없습니다</p> : renderList}
        </div>
      </div>
    );
  }

  export default TodoApp;`;
  const con18 = `// TodoItem.tsx
  import React, { CSSProperties } from "react";
  import { Todo } from "../modules/todos";

  type TodoItemProps = {
    todo: Todo;
    onToggle: (id: number) => void;
    onRemove: (id: number) => void;
  };

  function TodoItem({ todo, onToggle, onRemove }: TodoItemProps) {
    const textStyle: CSSProperties = {
      textDecoration: todo.done ? "line-through" : "none",
    };
    const removeStyle: CSSProperties = {
      marginLeft: 8,
      color: "red",
    };
    const handleToggle = () => {
      onToggle(todo.id);
    };
    const handleRemove = () => {
      onRemove(todo.id);
    };
    return (
      <li>
        <span onClick={handleToggle} style={textStyle}>
          {todo.text}
        </span>
        <span onClick={handleRemove} style={removeStyle}>
          (X)
        </span>
      </li>
    );
  }

  export default TodoItem;`;
  return (
    <div>
      <div className="r_con" id="ts_redux">
        <h2>리덕스 타입스크립트 적용</h2>
        <p>
          <a href="https://redux.js.org/">redux</a>란 react에서 사용하는
          상태관리 라이브러리이다.
        </p>
        <div>redux에 타입스크립트 적용</div>
        <div className="box_container">
          <h3>1. 리덕스</h3>
          <div className="content_box">
            <h4>- 기본</h4>
            <div>리덕스 타입스크립트에 관련된 라이브러리 설치</div>
            <CodeHighlighter type="javascript" content={con1} />
            <CodeHighlighter type="javascript" content="modules 폴더 생성" />
          </div>
          <div className="content_box">
            <h4>- 리덕스에 타입스크립트 적용</h4>
            <p>간단한 counter 리덕스 만들어보기</p>
            <CodeHighlighter type="javascript" content={con2} />
            <div className="title">1. 액션 생성함수 선언 및 액션 타입 정의</div>
            <CodeHighlighter type="javascript" content={con3} />
            <CodeHighlighter type="javascript" content={con4} />
            <CodeHighlighter type="typescript" content={con5} />
          </div>
          <div className="content_box">
            <div className="title">
              2.state 선언(초기상태 선언)과 state 타입 정의
            </div>
            <p>redux-thunk는 액션을 dispatch하는 함수를 리턴해준다.</p>
            <CodeHighlighter type="typescript" content={con6} />
          </div>
          <div className="content_box">
            <div className="title">3. 리듀서 생성</div>
            <CodeHighlighter type="javascript" content={con7} />
          </div>
          <div className="content_box">
            <div className="title">4. modules/counter.ts</div>
            <CodeHighlighter type="javascript" content={con8} />
          </div>
          <div className="content_box">
            <div className="title">5. rootReducer 생성</div>
            <p>reducer 함수 생성</p>
            <CodeHighlighter type="javascript" content={con9} />
          </div>
          <div className="content_box">
            <div className="title">
              6. 컴포넌트에서 redux 사용하도록 redux 연결
            </div>
            <p>reducer 함수 생성</p>
            <CodeHighlighter type="javascript" content={con10} />
          </div>
        </div>
        <div>
          <p>모듈화 시켜보기</p>
        </div>
        <div className="box_container">
          <h3>2. 리팩토링</h3>
          <div className="content_box">
            <h4>- 기본</h4>
            <div>모듈화 시켜보기</div>
          </div>
          <div className="content_box">
            <div className="title">기존</div>
            <CodeHighlighter type="javascript" content={con11} />
          </div>
          <div className="content_box">
            <div className="title">역할 별로 모듈화</div>
            <CodeHighlighter type="javascript" content={con12} />
            <CodeHighlighter type="javascript" content={con13} />
            <CodeHighlighter type="javascript" content={con14} />
            <CodeHighlighter type="javascript" content={con15} />
            <CodeHighlighter type="javascript" content={con16} />
          </div>
          <div className="content_box">
            <div className="title">컴포넌트에서 redux 사용</div>
            <CodeHighlighter type="typescript" content={con17} />
            <CodeHighlighter type="typescript" content={con18} />
          </div>
        </div>
      </div>
      <div className="r_con" id="ts_redux2">
        <div className="box_container">
          <div className="content_box">
            <h4>- redux-thunk와 redux-thunk와 함께 타입스크립트 사용</h4>
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
            <CodeHighlighter
              type="javascript"
              content={rootReducerSagaContent}
            />
          </div>
          <div className="content_box">
            <div className="title">
              6. 컴포넌트에서 redux 사용하도록 redux 연결
            </div>
            <p>reducer 함수 생성</p>
            <CodeHighlighter type="javascript" content={reduxSagaconnect} />
          </div>
        </div>
        <div>
          <p>
            반복되는 코드가 많고 유지보수성을 위해 utils함수를 만들어
            리팩토링해보자!
          </p>
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

export default ReduxTool;
