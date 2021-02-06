cd C:\folder
setlocal enabledelayedexpansion
for %%a in (abc_*.jpeg) do (
set f=%%a
set f=!f:^(=!
set f=!f:^)=!
ren "%%a" "!f!"
)