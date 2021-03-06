# Pokedex app made with React Native

## Download last build APK

https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40chiltepin/Pokedex-ac91302b0e4c4b0d9027d536f96cb7fe-signed.apk

## How it looks

### Pokemon List

<img src="https://i.imgur.com/sYFVZ2k.png" alt="Pokemon List" />

<img src="https://i.imgur.com/FEO2WAH.png" alt="Pokemon List Search" />

### Pokemon View

<img src="https://i.imgur.com/jkkZhfj.png" alt="Pokemon View" />

## What it does

- It renders a Pokemon List by fetching https://pokeapi.co/api/v2 API
- Each Pokemon Card can be tapped to expand Pokemon stats
- Note: The search bar only searches for Pokemons that have been previously loaded (The API doesn't support to search by name besides unique given name)
- The app detects the device language and it translates whether is french, spanish or english. The default is english
- Pokemon List is optimized by rendering memoized child Pokemon Card (React.memo)

## What can be improved/upcoming

- Testing using Jest/React testing library

## CI/CD

- Currently, it installs dependencies and does a linter status check
- It can be improved to auto deploy to Expo if the checkedout branch is on main

## Getting started

Assumptions: Make sure to have Node, Yarn already installed and expo cli (for deploying)

```
yarn install
yarn start
```
