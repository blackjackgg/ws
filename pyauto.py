# windows 窗口自动操作方法
from pywinauto import application
#app = application.Application().start(cmd_line="notepad.exe")
app =application.Application(backend="uia").connect(process=8836)
login =app.window(class_name = "ToolbarWindow32")

login.print_control_identifiers()

OK = u'Edit'
login[OK].click()
print("sss")
# print(app,login)