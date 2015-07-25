from fabric.api import run, cd, abort, require, sudo, env, put, path
from fabric.decorators import runs_once, roles
from fabric.contrib.console import confirm


def default():
  install()
  setup()
  activate()

def install():
  sudo("yum install git redis --enablerepo=epel -y", warn_only=True)
  sudo("wget http://nodejs.org/dist/v0.12.2/node-v0.12.2-linux-x64.tar.gz -O node-v0.12.2.tar.gz")
  sudo("tar zxvf node-v0.12.2.tar.gz")
  path("~/node-v0.12.2/bin")
  # sudo("yum install git redis nodejs npm --enablerepo=epel -y", warn_only=True)
  sudo("rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm", warn_only=True)
  sudo("yum --enablerepo=remi install redis -y", warn_only=True)
  sudo("npm i -g forever", warn_only=True)

def setup():
  put("./conf/redis.conf", "/etc/redis.hb.conf", use_sudo=True)
  sudo("git clone https://github.com/TECHFUND/honeybase-sync-beta.git", warn_only=True);

def activate():
  with cd("./honeybase-sync-beta"):
    # sudo("redis-server /etc/redis.hb.conf", warn_only=True)
    sudo("redis-server /etc/redis.conf", warn_only=True)
    sudo("npm i", warn_only=True)
    sudo("forever start --killTree true --uid 'main' -a honeybase-sync.js", warn_only=True)
