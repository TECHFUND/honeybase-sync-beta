from fabric.api import task, run, cd, abort, require, sudo, env, put
from fabric.decorators import runs_once, roles
from fabric.contrib.console import confirm
import os, os.path, commands

@task(default=True)
def default():
  install_node()
  setup()
  activate()

def install_node():
  print os.path.isdir("/home/ec2-user/node-v0.12.2-linux-x64/")
  if not os.path.isdir("/home/ec2-user/node-v0.12.2-linux-x64/"):
    sudo("wget http://nodejs.org/dist/v0.12.2/node-v0.12.2-linux-x64.tar.gz -P /home/ec2-user")
    sudo("tar zxvf /home/ec2-user/node-v0.12.2-linux-x64.tar.gz")

def setup():
  # symbolic link
  sudo("unlink /usr/bin/node", warn_only=True)
  sudo("unlink /usr/bin/npm", warn_only=True)
  sudo("ln -s /home/ec2-user/node-v0.12.2-linux-x64/bin/node /usr/bin/node", warn_only=True)
  sudo("ln -s /home/ec2-user/node-v0.12.2-linux-x64/bin/npm /usr/bin/npm", warn_only=True)

  # git redis forever npm
  sudo("yum install redis --enablerepo=epel -y", warn_only=True)
  sudo("rpm -Uvh http://rpms.famillecollet.com/enterprise/remi-release-6.rpm", warn_only=True)
  sudo("yum --enablerepo=remi install redis -y", warn_only=True)
  sudo("yum install git --enablerepo=epel -y", warn_only=True)
  sudo("npm i -g forever", warn_only=True)
  sudo("git clone https://github.com/TECHFUND/honeybase-sync-beta.git", warn_only=True);
  with cd("./honeybase-sync-beta"):
    sudo("npm i", warn_only=True)

def activate():
    sudo("redis-server /etc/redis.conf &", warn_only=True)
