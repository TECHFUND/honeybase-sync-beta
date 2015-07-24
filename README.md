# requirement
- read `fabfile.py`

# how to use
## install from local
- `fab -i ~/.pem/likeapp-kp1.pem -u ec2-user -H <target_host> default`

## run on server
- `forever start --killTree true honeybase-sync.js`

## stop on server
- `forever stopall`
