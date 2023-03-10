require('shelljs/global');

try {
    hexo.on('deployAfter', function() {//当deploy完成后执行备份
        run();
    });
} catch (e) {
    console.log("产生了一个错误啊<(￣3￣)> !，错误详情为：" + e.toString());
}

function run() {
    if (!which('git')) {
        echo('Sorry, this script requires git');
        exit(1);
    } else {
        echo("============================ Auto Backup Begin ============================");

        echo('git add -A');
        cd('/Users/liuxy/Desktop/Projects/Blog/liuxy0551.github.io');    //此处修改为Hexo根目录路径

        if (exec('git add -A').code !== 0) {
            echo('Error: git add failed');
            exit(1);
        } else {
            echo('Success: git add success');
            echo('git commit -m "deploy: hexo d"');
        }

        if (exec('git commit -m "deploy: hexo d"').code !== 0) {
            echo('Error: git commit failed');
            exit(1);
        } else {
            echo('Success: git commit success');
            echo('git push origin develop');
        }

        if (exec('git push origin develop').code !== 0) {
            echo('Error: git push origin failed');
            exit(1);
        } else {
            echo('Success: git push origin success');
            echo('git push gitee develop');
        }

        if (exec('git push gitee develop').code !== 0) {
            echo('Error: git push gitee failed');
            exit(1);
        } else {
            echo('Success: git push gitee success');
        }

        echo("============================ Auto Backup Complete ============================")
    }

}
