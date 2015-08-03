from fabric.api import run, cd, abort, require, sudo, env, put, path
from fabric.decorators import runs_once, roles
from fabric.contrib.console import confirm


def default():
  install()
  activate()

def install():
  # node
  sudo("wget http://nodejs.org/dist/v0.12.2/node-v0.12.2-linux-x64.tar.gz")
  sudo("tar zxvf node-v0.12.2-linux-x64.tar.gz")
  sudo("ln -s ~/node-v0.12.2-linux-x64/bin/node /usr/bin/node")
  sudo("ln -s ~/node-v0.12.2-linux-x64/bin/npm /usr/bin/npm")

  # git redis forever npm
  sudo("yum install git redis --enablerepo=epel -y", warn_only=True)
  sudo("rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm", warn_only=True)
  sudo("yum --enablerepo=remi install redis -y", warn_only=True)
  sudo("npm i -g forever", warn_only=True)
  sudo("git clone https://github.com/shogochiai/honeybase-sync-beta.git", warn_only=True);
  with cd("./honeybase-sync-beta"):
    sudo("npm i", warn_only=True)

def activate():
    sudo("redis-server /etc/redis.conf &", warn_only=True)
