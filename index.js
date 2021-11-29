const app = require("./app");
const http = require("http"),
  cluster = require("cluster"),
  os = require("os").cpus().length;
if (cluster.isMaster) {
  for (let i = 0; i < os; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
  });
} else {
  const server = http.Server(app);
  server.listen(
    parseInt(process.env.PORT_SERVER),
    process.env.HOST_SERVER,
    () => {
      console.log("API EN LINEA - EN EL NUCLEO: ",cluster.worker.id);
    }
  );
}

