module.exports = {
    database: 'blog',
    username: 'root',
    password: '!Zs13677971568',
    host: 'localhost',
    pool: {
        max: 5,
        idle: 30000
    },
    dialect: 'mysql',
    define: {
        timestamps: true,
    }
}