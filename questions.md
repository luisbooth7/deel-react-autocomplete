# React Assessment

### 1.  What is the difference between Component and PureComponent? give an example where it might break my app.

The main difference is that PureComponent has a built-in implementation for the shouldComponentUpdate() lifecycle method. It only performs a shallow comparison of the props objects so it is best to avoid them when handling complex prop objects. A good way to make use of them is in small and final components where there are no other children components to avoid introducing unnecessary bugs.

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

shouldComponentUpdate will not react to Context state changes. If a component implements this lifecycle method it will wait for props to change, but any changes in the context will not propagate.

### 3. Describe 3 ways to pass information from a component to its PARENT.
1. By passing a callback function as a prop to a child component
2. Using React Context
3. Using 3rd party state management libraries such as redux

### 4.  Give 2 ways to prevent components from re-rendering.
1. Using React.memo()
2. Using shouldComponentUpdate or using PureComponents which have a built-in implementation for it.

### 5.  What is a fragment and why do we need it? Give an example where it might break my app.
A fragment is a way to create "empty" wrappers in React. This is very useful in cases where a wrapper element is unnecessary, such as when rendering an array of `<li>` inside a `<ul>`, considering `<ul>` is in the parent component. They might break the app when a parent component is expecting a single DOM element.

### 6.  Give 3 examples of the HOC pattern.
1. React Context
2. React Router
3. Components for lazy loading images

### 7. What's the difference in handling exceptions in promises, callbacks and async...await.
The main difference is that promises don't need to be wrapped inside a try/catch block to handle exceptions, as they already include built-in methods (syntactic sugar 🍰) to handle said exceptions.

### 8. How many arguments does setState take and why is it async.
It can take 2 arguments:
1. A function that gives you access to previous state and should return an object that will be merged with the current state, or just a simple object.
2. A callback function that runs after the setState operation concludes.

setState is asynchronous as React will batch updates and decide the best time to perform these in the most optimal way. This is why we should use a function to update the state in case we depend on calculations based on previous state.



### 9. List the steps needed to migrate a Class to Function Component.
1. Break down the component's functionality, by reading and understanding the code, tests, and ideally getting the list of business rules associated with it
2. Identify the need for state and replace with useState hook if needed.
3. Identify any side-effects needed and re-write using useEffect if needed.
4. For pure components, use React.memo() to replicate performance optimizations.

### 10.   List a few ways styles can be used with components.
1. Traditional CSS with stylesheets
2. Inline CSS
3. CSS in JS
4. CSS modules

### 11. How to render an HTML string coming from the server.
If the page is being rendered client-side then we use the attribute `dangerouslySetInnerHTML`
