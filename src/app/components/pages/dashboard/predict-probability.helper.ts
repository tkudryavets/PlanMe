// import { MultinomialNB } from 'naivebayes';
// export function bayes(){

//     const trainingData = [
//         { task: 'Task A', category: 'Work', completed: true },
//     { task: 'Task B', category: 'Work', completed: false },
//     { task: 'Task C', category: 'Personal', completed: true }];

// const features = ['category', 'completed'];
// const classifier = new MultinomialNB();
// const X = trainingData.map((data) => [data.category, data.completed ? 'completed' : 'not completed']);
// const y = trainingData.map((data) => data.task);
// classifier.fit(X, y, features);


// const currentDayTasks = [
//     { task: 'Task D', category: 'Work' },
//     { task: 'Task E', category: 'Personal' },
//   ];
  
//   const predictions = currentDayTasks.map((task) => {
//     const X_pred = [[task.category, 'completed']];
//     const probabilities = classifier.predictProbabilities(X_pred);
//     return {
//         task: task.task,
//       category: task.category,
//       probability: probabilities[0].completed,
//     };
// });
  
// console.log(predictions);
// }