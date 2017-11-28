cd angular-src
echo "Entered angular src folder"
npm install
echo "Dependencies installed"
mkdir public
ng build
echo "Finished building frontend"
cd ..
ls
ls public