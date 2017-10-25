function fetchHotspots(option,query=""){

  return fetch(`http://localhost:3000/${option}/${query}`)
    .then(res=> res.json())
}

export default fetchHotspots
