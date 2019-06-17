const exampleMixin = {
    methods: {
        hello(message = "Hello World") {
            console.info(message);
        }
    }
};

export { exampleMixin };
