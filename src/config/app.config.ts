export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    defaultLimit: +process.env.DEFAULT_LIMIT || 5,
    mongodb: process.env.MONGODB || "mongodb+srv://gpcortes:oIZpZZ8rOSmc5zgp@cluster0.1wjirzw.mongodb.net/nest-pokemon",
    port: +process.env.PORT || 3000,
    defaulOffset: +process.env.DEFAULT_OFFSET || 0
})
