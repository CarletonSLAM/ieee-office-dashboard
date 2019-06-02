#! /bin/bash


YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}In directory $PWD${NC}..."

sudo apt-get update
sudo apt-get install libssl-dev make build-essential libssl-dev zlib1g-dev libbz2-dev libsqlite3-dev libpq-dev postgresql-server-dev-all
# Install pyenv if does not exist via https://github.com/pyenv/pyenv-installer

if ! type "pyenv" &> /dev/null; then
    echo "Installing pyenv..."
    curl https://pyenv.run | bash &&
    echo "Make the changes in ~/.zshrc or ~/.bashrc and source the new file. Then re-run make install"
else
    echo 'pyenv is installed'
fi

echo -e "${YELLOW}Run 'pipenv shell' then 'pipenv install'${NC}"