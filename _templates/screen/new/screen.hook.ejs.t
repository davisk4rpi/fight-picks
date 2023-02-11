---
to: screens/<%=name%>/<%=h.inflection.dasherize(h.changeCase.snake(name))%>-screen.hook.ts
---

export const use<%=name%>Screen = () => {
  return {
    loading: false,
  };
};
