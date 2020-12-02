#!/bin/sh

HOST_IP=$(ipconfig getifaddr en0);
HOST_IP=$HOST_IP docker-compose up -d;

sleep 2 && docker-compose ps;