from django.urls import path
from .import views

urlpatterns = [
    path('',views.login,name='login'),
    path('home',views.index,name='index'),
    path('documents',views.documents,name='documents'),
    path('documents/add',views.addDoc,name='addDoc'),
    path('documentDetails',views.docDetails,name='docDetails'),
    path('documentDetails/edit',views.docEdit,name='docEdit'),
    path('documents/ocr',views.ocr,name='ocr'),
    path('preview',views.preview,name='preview'),
]