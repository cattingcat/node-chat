WHERE npm
IF %ERRORLEVEL% NEQ 0 (
	ECHO npm is not exist, please install node
) ELSE (
	call npm install -g grunt-cli
	cd ..\src
	call npm install
)	

pause