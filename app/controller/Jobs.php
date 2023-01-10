<?php
namespace app\controller;

use app\BaseController;
use QL\QueryList;
use think\facade\Db;
use think\facade\Queue;
use think\queue\Job;

class Jobs extends BaseController
{
    public function updateVersion(Job $job, $data)
    {
        $url = 'https://mcversions.net/';
        $i = 0;
        $d = [];
        $rt = QueryList::get($url)->find('div.grid .item')->map(function($item)use(&$i, &$d){
            $name = $item->id;
            $date = $item->find('time')->html();
            $time = strtotime($date);
            $url = $item->find('a')->attr('href');

            if($i > 0){
                if($d[$i-1] == $time){
                    $time--;
                }
                if($d[$i-1] + 1 == $time){
                    $time = $time - 2;
                }
                if($d[$i-1] + 2 == $time){
                    $time = $time - 3;
                }
                if($d[$i-1] + 3 == $time){
                    $time = $time - 4;
                }
                if($d[$i-1] + 4 == $time){
                    $time = $time - 5;
                }
            }
            $data = [
                'name' => $name,
                'time' => $time,
                'date' => $date,
                'url' => $url,
            ];
            $d[$i] = $time;
            $i++;
            return $data;
        });
        $data = $rt->all();
        foreach ($data as $k => $v) {
            if(!$v['name']){
                unset($data[$k]);
            }
        }

        $array_sort = array_column($data, 'time');
        array_multisort($array_sort, SORT_DESC, $data);

        foreach ($data as $k => $v) {
            Queue::push('app\controller\jobs@updateVersion2', $v);
        }

        $job->delete();
    }

    public function updateVersion2(Job $job, $data)
    {
        $check = Db::name('minecraft_versions')->where("version = '$data[name]'")->find();
        if(empty($check)){
            $href = QueryList::get('https://mcversions.net' . $data['url'])->find('div.downloads')->find('a:eq(0)')->attr('href');

            $insert_data = [
                'version' => $data['name'],
                'time' => $data['time'],
                'date' => $data['date'],
                'url' => $data['url'],
                'download' => $href,
            ];
            Db::name('minecraft_versions')->insert($insert_data);
        }

        $job->delete();
    }

    public function updateForgeVersion(Job $job, $data)
    {
        try {
            $s = QueryList::get('https://files.minecraftforge.net/net/minecraftforge/forge/index_'.$data['version'].'.html', null, [
                'proxy' => 'http://192.168.1.60:7890',
            ])->find('div.download-container .download-list tbody tr')->map(function($item){
                $item->find('.download-version')->find('i')->remove();
                $version = $item->find('.download-version')->html();
                $time = $item->find('.download-time')->html();
                $download = $item->find('.download-files .download-links li:eq(0) a:eq(2)')->attr('href');
                if(!preg_match('/\.jar/', $download)){
                    $download = $item->find('.download-files .download-links li:eq(1) a:eq(2)')->attr('href');
                    if(!preg_match('/\.jar/', $download)){
                        $download = $item->find('.download-files .download-links li:eq(2) a:eq(2)')->attr('href');
                        if(!preg_match('/\.jar/', $download)){
                            $download = $item->find('.download-files .download-links li:eq(3) a:eq(2)')->attr('href');
                            if(!preg_match('/\.jar/', $download)){
                                $download = '';
                            }
                        }
                    }
                }
                $return_data = [
                    'version' => $version,
                    'time' => $time,
                    'download' => $download,
                ];
                return $return_data;
            });
            $list_data = $s->all();

            foreach ($list_data as $k => $v) {
                $check = Db::name('forge_versions')->where("mc_version_id = '$data[id]' and version = '$v[version]'")->find();
                if(empty($check)){
                    $insert_data = [
                        'mc_version_id' => $data['id'],
                        'version' => $v['version'],
                        'date' => $v['time'],
                        'download' => $v['download'],
                    ];
                    Db::name('forge_versions')->insert($insert_data);
                }
            }
        }catch(\Exception $e){
            echo $e->getCode();
        }

        $job->delete();
    }
}
