const data = [
  {
    title: 'input',
    react_content: [
      {
        content: '- 리엑트에서무조건 input 요소는 onChange 이벤트와 함께 쓰며 e.target.value로 값을갱신해준다.',
      },
    ],
    react_code: [
      {
        type: 'html',
        content: '<Input type="email" id="email" name="email" value={email} onChange={onChangeEmail} />',
      },
    ],
    vue_content: [
      {
        content: '- v-model로 바운딩.',
      },
      {
        content: `- 한글같은경우 반박자늦는데 이렇게 input이벤트 쓰면 그거 극복가능!
          onInput($event)라고 굳이 안 넣어줘도 잘 동작한다.`,
      },
    ],
    vue_code: [
      {
        type: 'html',
        content: '<input type="text" v-model="email" @input="onInput" name="email" />',
      },
      {
        type: 'javascript',
        content: `onInput(e) {
              console.log(e.target.value);this.email = e.target.value;
          }`,
      },
    ],
  },
];

export default data;
