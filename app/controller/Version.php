<?php
namespace app\controller;

use app\BaseController;
use QL\QueryList;
use think\facade\Db;
use think\facade\Queue;

class Version extends BaseController
{
    public function update()
    {
        Queue::push('app\controller\jobs@updateVersion');
    }

    public function forge()
    {
        $version_list = Db::name('minecraft_versions')->field('id,version')->select();
        foreach ($version_list as $k => $v) {
            Queue::push('app\controller\jobs@updateForgeVersion', $v);
        }
    }
}
