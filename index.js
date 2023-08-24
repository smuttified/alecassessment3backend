const app = require("./server");
const controller = require("./controller");

async function main(){
    await app.start();
}

main();

controller.route();