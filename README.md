# requirement
- read `fabfile.py`

# how to use
## install from local
- `fab -i ~/.pem/likeapp-kp1.pem -u ec2-user -H <target_host> default`

## run on server
- `forever start --killTree true --uid 'main' honeybase-sync.js`

## stop on server
- `forever stop main`

# FYI
- `watch` (auto relaod) activated
- `tail -f ~/.forever/main.log` enable you to stream logs.
