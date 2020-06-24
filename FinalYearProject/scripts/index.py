import os
import sys
args = {}
names = ['username', 'facebookid', 'instagramid', 'redditid', 'twitterid', 'imageAnalysis']
for i in range(len(names)):
    if(sys.argv[i + 1]):
        args[names[i]] = sys.argv[i + 1]
print(args)