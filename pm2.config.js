// 名称任意，按照个人习惯来
module.exports = {
  apps: [
    {
      name: 'littleWechat-admin', // 应用名称
      script: './setup.js', // 启动文件地址
      cwd: '/home/littleWechat-admin', // 当前工作路径
      watch: [
        // 监控变化的目录，一旦变化，自动重启
        'controllers'
      ],
      ignore_watch: [
        // 忽视这些目录的变化
        'node_modules'
      ],
      node_args: '--harmony', // node的启动模式
      env: {
        NODE_ENV: 'development' // 设置运行环境，此时process.env.NODE_ENV的值就是development
      },
      env_production: {
        NODE_ENV: 'production',
      },
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z'
    },
  ],
};

