<?php
namespace app\controller;

use app\BaseController;
use Symfony\Component\Yaml\Yaml;

class Index extends BaseController
{
    public function index()
    {
        return view();
//        $value = Yaml::parseFile(public_path() . 'a.yaml');
//        dump($value);
//        $d = file_get_contents(public_path() . 'docker-compose.yml');
//        $y = Yaml::parse($d);
//        dump($y);
//        $a = '{"version":"3","services":{"mc":{"image":"itzg\/minecraft-server:java8","ports":["25565:25565"],"environment":["EULA=TRUE","VERSION=1.12.2","TYPE=FORGE","FORGE_VERSION=14.23.5.2854"],"tty":true,"stdin_open":true,"restart":"unless-stopped","volumes":[".\/minecraft-data-1.12.2:\/data"]},"mc1":{"image":"itzg\/minecraft-server","ports":["25566:25565"],"environment":["EULA=TRUE","VERSION=1.18"],"tty":true,"stdin_open":true,"restart":"unless-stopped","volumes":[".\/minecraft-data-1.18:\/data"]}}}';
//        $a = json_decode($a, true);
//        $b = Yaml::dump($a);
//        file_put_contents(public_path() . 'a.yaml', $b);
    }

    public function generate_yaml()
    {
        $a = '1.19-pre5';
        $b = '1.19-rc2';
        echo $a."\r\n";
        echo $b."\r\n";
        echo version_compare($a, $b);die;
        $data = input();
        $yaml_data = [
            'version' => '3'
        ];
        foreach ($data['data'] as $k => $v) {
            $image = 'itzg/minecraft-server';
            if($v['environment']['VERSION'] <= '1.10' || ($v['environment']['VERSION'] <= '1.17' && $v['environment']['TYPE'] == 'FORGE')){
                $image = 'itzg/minecraft-server:java8';
            }
            $yaml_data[$v['services_name']] = [
                'image' => $image,
                'container_name' => !empty($v['container_name']) ? $v['container_name'] : 'mc' . $k,
                'tty' => true,
                'stdin_open' => true,
                'restart' => 'unless-stopped'
            ];
            foreach($v['ports'] as $kk => $vv){
                $yaml_data[$v['services_name']]['ports'][] = "$vv[one]:$vv[two]";
            }
        }
        $b = Yaml::dump($yaml_data);
        echo $b;
    }
}
