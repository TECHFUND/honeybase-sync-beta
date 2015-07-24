from fabric.api import run, cd, abort, require, sudo, env
from fabric.decorators import runs_once, roles
from fabric.contrib.console import confirm


def default():
  sudo("yum install git redis-server nodejs npm --enablerepo=epel -y");
  sudo("rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm", warn_only=True)
  sudo("yum --enablerepo=remi install redis -y")
  put("./conf/redis.conf /etc/redis.hb.conf", use_sudo=True)
  sudo("redis-server /etc/redis.hb.conf")
  sudo("git clone https://github.com/TECHFUND/honeybase-sync-beta.git", warn_only=True);
  with cd("./honeybase-sync-beta"):
    sudo("npm i")
    sudo("node honeybase-sync.js &")
