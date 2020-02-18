document.addEventListener('DOMContentLoaded', () => {
  const id = location.pathname
  console.log(id)

  // // axios.get(`https://swapi.co/api/people/?page=${id}`)
  // //   .then(allCharacters => printCharacters(allCharacters))

  // // const printCharacters = data => {
  // //   console.log(data.data.results)
  // //   drawPolarChart('q1', data.data.results)
  // // }

  // const drawPolarChart = (id, data) => {

  //   new Chart(id, {
  //     type: 'polarArea',
  //     data: {
  //       labels: ['Orange eyes', 'Brown eyes', 'Yellow eyes', 'Red eyes', 'Black eyes'],
  //       datasets: [{
  //         data: [
  //           data.filter(character => character.eye_color.includes('orange')).length,
  //           data.filter(character => character.eye_color.includes('brown')).length,
  //           data.filter(character => character.eye_color.includes('yellow')).length,
  //           data.filter(character => character.eye_color.includes('red')).length,
  //           data.filter(character => character.eye_color.includes('black')).length
  //         ],
  //         borderColor: 'white',
  //         borderWidth: 2,
  //         backgroundColor: [
  //           'rgba(0, 50, 250, .2)',
  //           'rgba(0, 250, 50, .2)',
  //           'rgba(0, 50, 250, .2)',
  //           'rgba(0, 250, 50, .2)',
  //           'rgba(0, 50, 250, .2)']
  //       }]
  //     },
  //     options: {
  //       legend: {
  //         position: 'left'
  //       }
  //     }
  //   })
  // }



}, false);
