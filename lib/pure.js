

const ignore_msgs = ["node"];

const parse = {
  init: data => ({data: data[1]}),
  target: data => ({data: data[1]}),
  srstep: data => {
    let d = data[2].split("_");
    return {
      type: "rstep",
      from: d[0]+"_"+d[1],
      to: d[2]+"_"+d[3],
      rule: data[0]
    }
  },
  step: data => {
    let d = data[1].split("_");
    return {
      from: d[0]+"_"+d[1],
      to: d[2]+"_"+d[3]
    }
  },
  rstep: data => {
    let d = data[2].split("_");
    return {
      from: d[0]+"_"+d[1],
      to: d[2]+"_"+d[3],
      rule: data[0]
    }
  }
}


module.exports = msg => {
  let data = msg.data.split(" ").slice(1);
  return data[0] in parse
    && Object.assign({type: data[0]}, parse[data[0]](data.slice(1)))
    || {type: "unknown", data}
}
