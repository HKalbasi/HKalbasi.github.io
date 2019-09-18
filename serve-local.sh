#!/bin/bash

nam=hamid-site-jekyll-server

case $1 in
	kill) 
		tmux kill-session -t $nam &&
		echo OK || echo Failed
		;;
	serve) 
		tmux new -d -s $nam && 
		tmux send-keys -t $nam "jekyll serve" Enter &&
		echo OK || echo Failed
		;;
	*) 
		echo "Commands:"
		echo "  serve    ------     start the server"
		echo "  kill     ------     kill the server"
		;;
esac
