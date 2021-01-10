/**
 * Screen view that invokes a
 * function that renders a 404 response 
 * if a URL route entered to parse for is not found.
 * @returns HTML markup with the error message not found 
 */
const Error404Screen = {
    render: () => {
        return `
        <h1>404</h1>
        <div>Page not found!</div>
        `;
    },
};
export default Error404Screen;