from django.contrib import admin
from django.urls import path, include
from .import settings
from django.contrib.staticfiles.urls import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

urlpatterns = [
	path('tax/', include('tax_app.urls'), name='taxApp'),
	path('', include('wisapp.urls'), name='staffApp'),
    path('admin/', admin.site.urls),
]

urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)