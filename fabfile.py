from fabric.api import run, cd, abort, require, sudo, env, put
from fabric.decorators import runs_once, roles
from fabric.contrib.console import confirm


def default():
  sudo("yum install git redis-server nodejs npm --enablerepo=epel -y", warn_only=True);
  sudo("rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm", warn_only=True)
  sudo("yum --enablerepo=remi install redis -y", warn_only=True)
  put("./conf/redis.conf /etc/redis.hb.conf", use_sudo=True)
  sudo("redis-server /etc/redis.hb.conf", warn_only=True)
  sudo("git clone https://github.com/TECHFUND/honeybase-sync-beta.git", warn_only=True);
  with cd("./honeybase-sync-beta"):
    sudo("npm i", warn_only=True)
    sudo("node honeybase-sync.js &", warn_only=True)
