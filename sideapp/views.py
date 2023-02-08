from django.shortcuts import render

# Create your views here.

def login(request):
    return render(request,'sideapp/login.html')

def register(request):
    return render(request,'sideapp/register.html')

def home(request):
    return render(request,'sideapp/home.html')


def user(request):
    return render(request,'sideapp/user.html')

def index(request):
    return render(request,'sideapp/index.html')

def documents(request):
    return render(request,'sideapp/documents.html')

def addDoc(request):
    return render(request,'sideapp/addDocuments.html')

def docDetails(request):
    return render(request,'sideapp/documentDetails.html')

def docEdit(request):
    return render(request,'sideapp/documentEdit.html')

def ocr(request):
    return render(request,'sideapp/documentsOcr.html')

def preview(request):
    return render(request,'sideapp/documentPreview.html')