import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreComponents } from 'app/core/core-components.module';
import { CommonDirectivesModule } from 'app/directives/common/common-directives.module';
import { EntityModule } from 'app/modules/entity/entity.module';
import { IxFormsModule } from 'app/modules/ix-forms/ix-forms.module';
import { SshConnectionFormComponent } from 'app/pages/credentials/backup-credentials/ssh-connection-form/ssh-connection-form.component';
import { SshKeypairFormComponent } from 'app/pages/credentials/backup-credentials/ssh-keypair-form/ssh-keypair-form.component';
import {
  CertificateAcmeAddComponent,
} from 'app/pages/credentials/certificates-dash/certificate-acme-add/certificate-acme-add.component';
import {
  CertificateDetailsComponent,
} from 'app/pages/credentials/certificates-dash/certificate-details/certificate-details.component';
import { AcmednsFormComponent } from 'app/pages/credentials/certificates-dash/forms/acmedns-form/acmedns-form.component';
import {
  SignCsrDialogComponent,
} from 'app/pages/credentials/certificates-dash/sign-csr-dialog/sign-csr-dialog.component';
import {
  ViewCertificateDialogComponent,
} from 'app/pages/credentials/certificates-dash/view-certificate-dialog/view-certificate-dialog.component';
import { KmipComponent } from 'app/pages/credentials/kmip/kmip.component';
import { BackupCredentialsComponent } from './backup-credentials/backup-credentials.component';
import { CloudCredentialsFormComponent } from './backup-credentials/forms/cloud-credentials-form.component';
import { CertificateAuthorityEditComponent } from './certificates-dash/certificate-authority-edit/certificate-authority-edit.component';
import { CertificateEditComponent } from './certificates-dash/certificate-edit/certificate-edit.component';
import { CertificatesDashComponent } from './certificates-dash/certificates-dash.component';
import { CertificateAuthorityAddComponent } from './certificates-dash/forms/ca-add.component';
import { CertificateAddComponent } from './certificates-dash/forms/certificate-add.component';

@NgModule({
  declarations: [
    BackupCredentialsComponent,
    SshConnectionFormComponent,
    CloudCredentialsFormComponent,
    SshKeypairFormComponent,
    CertificatesDashComponent,
    CertificateAddComponent,
    CertificateAuthorityAddComponent,
    CertificateAuthorityEditComponent,
    CertificateEditComponent,
    AcmednsFormComponent,
    SignCsrDialogComponent,
    ViewCertificateDialogComponent,
    CertificateDetailsComponent,
    KmipComponent,
    CertificateAcmeAddComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FlexLayoutModule,
    MatDividerModule,
    TranslateModule,
    MatIconModule,
    MatMenuModule,
    EntityModule,
    CommonDirectivesModule,
    IxFormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    CoreComponents,
    MatProgressBarModule,
    RouterModule,
  ],
})
export class CredentialsModule { }
