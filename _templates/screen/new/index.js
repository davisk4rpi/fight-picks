module.exports = {
  prompt: ({ prompter }) =>
    prompter
      .prompt({
        type: 'input',
        name: 'name',
        message: 'What is the new Screens name?',
      })
      .then(({ name }) => {
        const trimmedName = name.trim();
        if (trimmedName.toLowerCase().endsWith('screen')) {
          return { name: trimmedName.slice(0, -5) };
        }
        return { name: trimmedName };
      }),
};
