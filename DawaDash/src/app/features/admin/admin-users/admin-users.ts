import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ProviderTreatedPatient,
  UserAccountStatus,
  UserCategoryTab,
  UserChemistItem,
  UserCustomerItem,
  UserDoctorItem,
  UserHospitalItem,
  UserNurseItem,
  UserStatusFilter,
} from '../models/admin-models';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
})
export class AdminUsers {
  activeCategory = signal<UserCategoryTab>('customers');
  activeStatus = signal<UserStatusFilter>('all');
  searchTerm = signal<string>('');

  // Selected detail entity
  selectedCategory = signal<UserCategoryTab | null>(null);
  selectedId = signal<string | null>(null);

  // Reason Modal (Suspend / Ban)
  showReasonModal = signal<boolean>(false);
  pendingActionType = signal<'suspend' | 'ban'>('suspend');
  actionReason = signal<string>('');

  // Clinical note preview modal
  activeNotePatient = signal<ProviderTreatedPatient | null>(null);

  // Transient confirmation notice
  statusNotice = signal<string | null>(null);

  customers = signal<UserCustomerItem[]>([
    {
      id: 'cust-1',
      initials: '[C]',
      name: '[Customer name]',
      email: 'name@email.com',
      phone: '[phone]',
      status: 'active',
      county: 'Mombasa',
      joinedDate: '[date]',
      signInMethod: 'Google',
      ordersCount: 12,
      bookingsCount: 3,
      orders: [
        { orderNumber: '#1062', status: 'Delivered', date: '[date]', total: 540 },
        { orderNumber: '#1051', status: 'On the way', date: '[date]', total: 300 },
      ],
      bookings: [
        { providerName: 'Dr. [Name]', status: 'Booked', mode: 'Virtual', fee: 2200 },
        { providerName: 'Nurse [Name]', status: 'Done', mode: 'Home', fee: 1320 },
      ],
    },
    {
      id: 'cust-2',
      initials: '[C]',
      name: '[Customer name]',
      email: 'name@email.com',
      phone: '+254 712 440 812',
      status: 'active',
      county: 'Nairobi',
      joinedDate: '14 Oct 2026',
      signInMethod: 'Google',
      ordersCount: 4,
      bookingsCount: 1,
      orders: [
        { orderNumber: '#1049', status: 'Delivered', date: '24 Oct 2026', total: 890 },
      ],
      bookings: [
        { providerName: 'Dr. [Name]', status: 'Done', mode: 'Hospital', fee: 2750 },
      ],
    },
    {
      id: 'cust-3',
      initials: '[C]',
      name: '[Customer name]',
      email: 'name@email.com',
      phone: '+254 733 880 120',
      status: 'banned',
      county: 'Kisumu',
      joinedDate: '02 Sep 2026',
      signInMethod: 'Phone OTP',
      ordersCount: 1,
      bookingsCount: 0,
      orders: [
        { orderNumber: '#1008', status: 'Delivered', date: '05 Sep 2026', total: 350 },
      ],
      bookings: [],
      reason: 'Repeatedly submitted tampered prescription uploads.',
    },
    {
      id: 'cust-4',
      initials: '[C]',
      name: '[Customer name]',
      email: 'name@email.com',
      phone: '+254 720 198 441',
      status: 'active',
      county: 'Mombasa',
      joinedDate: '19 Oct 2026',
      signInMethod: 'Google',
      ordersCount: 7,
      bookingsCount: 2,
      orders: [
        { orderNumber: '#1058', status: 'Delivered', date: '26 Oct 2026', total: 1120 },
      ],
      bookings: [
        { providerName: 'Dr. [Name]', status: 'Booked', mode: 'Virtual', fee: 2200 },
      ],
    },
  ]);

  doctors = signal<UserDoctorItem[]>([
    {
      id: 'doc-1',
      initials: 'DN',
      avatarBadge: 'Dr',
      name: 'Dr. [Name]',
      city: 'Mombasa',
      status: 'active',
      specialty: 'Dentist',
      licenceExpires: '[date]',
      licenceBadgeType: 'normal',
      rating: '4.8',
      loginEmail: '[doctor@email]',
      joinedDate: '[date]',
      licenceNumber: '[number]',
      licenceValid: true,
      workplace: '[Hospital or clinic]',
      experienceYears: '[x] years',
      earnedKes: 96000,
      platformFeeKes: 9600,
      bookingModes: [
        { label: 'Virtual (online video call)', scheduleText: 'Mon to Fri · 6 pm to 9 pm', enabled: true },
        { label: 'Hospital visit', scheduleText: 'Tue, Thu · 9 am to 1 pm · [Hospital name]', enabled: true },
        { label: 'Home visit', scheduleText: 'Sat · 10 am to 4 pm · within 10 km', enabled: true },
      ],
      patientsTreated: [
        {
          id: 'pt-1',
          initials: '[P]',
          name: '[Patient name]',
          county: 'Mombasa',
          date: '[date]',
          mode: 'Virtual',
          notesSummary: 'Reviewed acute toothache and prescribed Amoxicillin 500mg TID for 5 days.',
        },
        {
          id: 'pt-2',
          initials: '[P]',
          name: '[Patient name]',
          county: 'Mombasa',
          date: '[date]',
          mode: 'Hospital',
          notesSummary: 'Completed periodontal scaling and warm saline rinse care plan.',
        },
      ],
      reviews: [
        { rating: '5.0', patientName: '[Patient name]', text: '[Review text]' },
        { rating: '4.5', patientName: '[Patient name]', text: '[Review text]' },
      ],
    },
    {
      id: 'doc-2',
      initials: 'DR',
      avatarBadge: 'Dr',
      name: 'Dr. [Name]',
      city: 'Nairobi',
      status: 'active',
      specialty: 'Optician',
      licenceExpires: '40 days left',
      licenceBadgeType: 'warning',
      rating: '4.6',
      loginEmail: 'optician@dawadash.ke',
      joinedDate: '12 Aug 2026',
      licenceNumber: 'KMPDC/OPT/7841',
      licenceValid: true,
      workplace: 'Westlands Vision Clinic',
      experienceYears: '7 years',
      earnedKes: 74500,
      platformFeeKes: 7450,
      bookingModes: [
        { label: 'Virtual (online video call)', scheduleText: 'Mon to Fri · 5 pm to 8 pm', enabled: true },
        { label: 'Hospital visit', scheduleText: 'Mon, Wed, Fri · 9 am to 3 pm · Westlands Vision Clinic', enabled: true },
        { label: 'Home visit', scheduleText: 'Unavailable', enabled: false },
      ],
      patientsTreated: [
        {
          id: 'pt-3',
          initials: '[P]',
          name: '[Patient name]',
          county: 'Nairobi',
          date: '27 Oct 2026',
          mode: 'Hospital',
          notesSummary: 'Refractive screening completed; updated lens prescription.',
        },
      ],
      reviews: [
        { rating: '4.8', patientName: '[Patient name]', text: 'Clear explanation and fast follow-up.' },
      ],
    },
    {
      id: 'doc-3',
      initials: 'DR',
      avatarBadge: 'Dr',
      name: 'Dr. [Name]',
      city: 'Kisumu',
      status: 'suspended',
      specialty: 'General',
      licenceExpires: 'Expired',
      licenceBadgeType: 'expired',
      rating: '4.2',
      loginEmail: 'general.kisumu@dawadash.ke',
      joinedDate: '04 Jun 2026',
      licenceNumber: 'KMPDC/GP/3019',
      licenceValid: false,
      workplace: 'Kisumu Medical Centre',
      experienceYears: '5 years',
      earnedKes: 38000,
      platformFeeKes: 3800,
      reason: 'Annual KMPDC practising licence expired; awaiting renewal upload.',
      bookingModes: [
        { label: 'Virtual (online video call)', scheduleText: 'Paused during suspension', enabled: false },
        { label: 'Hospital visit', scheduleText: 'Paused during suspension', enabled: false },
        { label: 'Home visit', scheduleText: 'Paused during suspension', enabled: false },
      ],
      patientsTreated: [
        {
          id: 'pt-4',
          initials: '[P]',
          name: '[Patient name]',
          county: 'Kisumu',
          date: '11 Oct 2026',
          mode: 'Virtual',
          notesSummary: 'Routine malaria antigen test follow-up.',
        },
      ],
      reviews: [
        { rating: '4.2', patientName: '[Patient name]', text: 'Helpful advice during late evening call.' },
      ],
    },
    {
      id: 'doc-4',
      initials: 'DR',
      avatarBadge: 'Dr',
      name: 'Dr. [Name]',
      city: 'Mombasa',
      status: 'active',
      specialty: 'Paediatrician',
      licenceExpires: '[date]',
      licenceBadgeType: 'normal',
      rating: '4.9',
      loginEmail: 'paeds@dawadash.ke',
      joinedDate: '22 Jul 2026',
      licenceNumber: 'KMPDC/PAED/5520',
      licenceValid: true,
      workplace: 'Coast General Annex',
      experienceYears: '11 years',
      earnedKes: 128000,
      platformFeeKes: 12800,
      bookingModes: [
        { label: 'Virtual (online video call)', scheduleText: 'Mon to Sat · 4 pm to 8 pm', enabled: true },
        { label: 'Hospital visit', scheduleText: 'Mon, Wed · 9 am to 2 pm · Coast General Annex', enabled: true },
        { label: 'Home visit', scheduleText: 'Sat · 9 am to 1 pm · within 12 km', enabled: true },
      ],
      patientsTreated: [
        {
          id: 'pt-5',
          initials: '[P]',
          name: '[Patient name]',
          county: 'Mombasa',
          date: '28 Oct 2026',
          mode: 'Home',
          notesSummary: 'Paediatric fever review and hydration schedule shared with parents.',
        },
      ],
      reviews: [
        { rating: '5.0', patientName: '[Patient name]', text: 'Very patient and thorough with our toddler.' },
      ],
    },
  ]);

  nurses = signal<UserNurseItem[]>([
    {
      id: 'nur-1',
      initials: 'NU',
      avatarBadge: 'Nu',
      name: 'Nurse [Name]',
      city: 'Mombasa',
      status: 'active',
      service: 'Wound care',
      licenceExpires: '[date]',
      licenceBadgeType: 'normal',
      rating: '4.9',
      loginEmail: 'woundcare.msa@dawadash.ke',
      joinedDate: '10 Aug 2026',
      licenceNumber: 'NCK-RN/44291',
      licenceValid: true,
      experienceYears: '6 years',
      earnedKes: 54000,
      platformFeeKes: 5400,
      bookingModes: [
        { label: 'Home visit', scheduleText: 'Mon to Sat · 8 am to 5 pm · within 15 km', enabled: true },
        { label: 'Virtual check-in', scheduleText: 'Mon to Fri · 6 pm to 8 pm', enabled: true },
      ],
      patientsTreated: [
        {
          id: 'npt-1',
          initials: '[P]',
          name: '[Patient name]',
          county: 'Mombasa',
          date: '[date]',
          mode: 'Home',
          notesSummary: 'Post-surgical dressing change completed using sterile saline protocol.',
        },
      ],
      reviews: [
        { rating: '5.0', patientName: '[Patient name]', text: 'Punctual and gentle during home dressing change.' },
      ],
    },
    {
      id: 'nur-2',
      initials: 'NU',
      avatarBadge: 'Nu',
      name: 'Nurse [Name]',
      city: 'Nairobi',
      status: 'active',
      service: 'Elderly care',
      licenceExpires: '[date]',
      licenceBadgeType: 'normal',
      rating: '4.7',
      loginEmail: 'eldercare.nbi@dawadash.ke',
      joinedDate: '02 Sep 2026',
      licenceNumber: 'NCK-RN/39108',
      licenceValid: true,
      experienceYears: '8 years',
      earnedKes: 68200,
      platformFeeKes: 6820,
      bookingModes: [
        { label: 'Home visit', scheduleText: 'Mon to Fri · 7 am to 4 pm · within 12 km', enabled: true },
        { label: 'Virtual check-in', scheduleText: 'Sat · 10 am to 1 pm', enabled: true },
      ],
      patientsTreated: [
        {
          id: 'npt-2',
          initials: '[P]',
          name: '[Patient name]',
          county: 'Nairobi',
          date: '26 Oct 2026',
          mode: 'Home',
          notesSummary: 'Vitals logged (BP 126/80) and weekly medication organizer refilled.',
        },
      ],
      reviews: [
        { rating: '4.7', patientName: '[Patient name]', text: 'Reliable daily check-ins for our grandfather.' },
      ],
    },
    {
      id: 'nur-3',
      initials: 'NU',
      avatarBadge: 'Nu',
      name: 'Nurse [Name]',
      city: 'Nakuru',
      status: 'pending',
      service: 'Injections',
      licenceExpires: '[date]',
      licenceBadgeType: 'normal',
      rating: 'New',
      loginEmail: 'injections.nkr@dawadash.ke',
      joinedDate: '27 Oct 2026',
      licenceNumber: 'NCK-RN/51802',
      licenceValid: true,
      experienceYears: '3 years',
      earnedKes: 0,
      platformFeeKes: 0,
      bookingModes: [
        { label: 'Home visit', scheduleText: 'Pending admin verification', enabled: false },
      ],
      patientsTreated: [],
      reviews: [],
    },
    {
      id: 'nur-4',
      initials: 'NU',
      avatarBadge: 'Nu',
      name: 'Nurse [Name]',
      city: 'Mombasa',
      status: 'active',
      service: 'Postnatal',
      licenceExpires: '12 days left',
      licenceBadgeType: 'warning',
      rating: '4.8',
      loginEmail: 'postnatal.msa@dawadash.ke',
      joinedDate: '15 Jul 2026',
      licenceNumber: 'NCK-RM/29440',
      licenceValid: true,
      experienceYears: '9 years',
      earnedKes: 61500,
      platformFeeKes: 6150,
      bookingModes: [
        { label: 'Home visit', scheduleText: 'Tue to Sun · 9 am to 5 pm · within 10 km', enabled: true },
      ],
      patientsTreated: [
        {
          id: 'npt-3',
          initials: '[P]',
          name: '[Patient name]',
          county: 'Mombasa',
          date: '28 Oct 2026',
          mode: 'Home',
          notesSummary: 'Newborn weight check and maternal recovery review completed.',
        },
      ],
      reviews: [
        { rating: '4.8', patientName: '[Patient name]', text: 'Supportive and reassuring postnatal guidance.' },
      ],
    },
  ]);

  chemists = signal<UserChemistItem[]>([
    {
      id: 'ch-1',
      initials: 'DB',
      avatarBadge: 'Ch',
      name: 'Diani Beach Pharmacy',
      city: 'Mombasa',
      status: 'active',
      licenceNumber: 'PPB/RET/2026/884',
      licenceValid: true,
      licenceExpires: '30 Jun 2027',
      licenceBadgeType: 'normal',
      ordersCount: 126,
      productsCount: 64,
      subscriptionPlan: 'Pro Pharmacy',
      phone: '+254 711 234 567',
      email: 'orders@dianibeachpharmacy.co.ke',
      joinedDate: '15 Jul 2026',
      earnedKes: 284000,
      platformFeeKes: 28400,
      subscriptionFeeKes: 15000,
    },
    {
      id: 'ch-2',
      initials: 'WC',
      avatarBadge: 'Ch',
      name: 'Westlands Care Pharmacy',
      city: 'Nairobi',
      status: 'pending',
      licenceNumber: 'PPB/RET/2026/912',
      licenceValid: true,
      licenceExpires: '28 Feb 2027',
      licenceBadgeType: 'warning',
      ordersCount: 0,
      productsCount: 18,
      subscriptionPlan: 'Starter Pharmacy',
      phone: '+254 722 891 034',
      email: 'compliance@westlandscare.ke',
      joinedDate: '27 Oct 2026',
      earnedKes: 0,
      platformFeeKes: 0,
      subscriptionFeeKes: 0,
    },
    {
      id: 'ch-3',
      initials: 'NC',
      avatarBadge: 'Ch',
      name: 'Nyali Coast Dispensary',
      city: 'Mombasa',
      status: 'suspended',
      licenceNumber: 'PPB/RET/2025/401',
      licenceValid: false,
      licenceExpires: 'Expired',
      licenceBadgeType: 'expired',
      ordersCount: 84,
      productsCount: 41,
      subscriptionPlan: 'Pro Pharmacy',
      phone: '+254 734 567 890',
      email: 'desk@nyalicoastdispensary.ke',
      joinedDate: '08 Jun 2026',
      earnedKes: 142500,
      platformFeeKes: 14250,
      subscriptionFeeKes: 15000,
      reason: 'Awaiting updated Pharmacy and Poisons Board (PPB) annual renewal certificate.',
    },
    {
      id: 'ch-4',
      initials: 'AC',
      avatarBadge: 'Ch',
      name: 'Apex Care Chemists',
      city: 'Kisumu',
      status: 'active',
      licenceNumber: 'PPB/RET/2026/677',
      licenceValid: true,
      licenceExpires: '25 days left',
      licenceBadgeType: 'warning',
      ordersCount: 93,
      productsCount: 52,
      subscriptionPlan: 'Growth Pharmacy',
      phone: '+254 701 334 998',
      email: 'hello@apexcarechemists.co.ke',
      joinedDate: '21 Aug 2026',
      earnedKes: 198000,
      platformFeeKes: 19800,
      subscriptionFeeKes: 10000,
    },
  ]);

  hospitals = signal<UserHospitalItem[]>([
    {
      id: 'hosp-1',
      initials: '[H]',
      name: '[Hospital name]',
      level: 'Level 5',
      status: 'active',
      type: 'Private',
      county: 'Mombasa',
      phone: '+254 7XX XXX XXX',
      email: 'admin@mombasacare.ke',
      joinedDate: '12 Jun 2026',
      registrationNumber: 'KMPDC-FAC/2026/104',
      doctorsCount: 18,
      departments: ['Outpatient', 'Paediatrics', 'Dental', 'Pharmacy'],
    },
    {
      id: 'hosp-2',
      initials: '[H]',
      name: '[Hospital name]',
      level: 'Level 4',
      status: 'active',
      type: 'Public',
      county: 'Nairobi',
      phone: '+254 7XX XXX XXX',
      email: 'records@nairobicountyhospital.go.ke',
      joinedDate: '04 Jul 2026',
      registrationNumber: 'MOH-FAC/2026/082',
      doctorsCount: 24,
      departments: ['General Medicine', 'Maternity', 'Laboratory', 'Emergency'],
    },
    {
      id: 'hosp-3',
      initials: '[H]',
      name: '[Hospital name]',
      level: 'Level 3',
      status: 'pending',
      type: 'Faith-based',
      county: 'Kisumu',
      phone: '+254 7XX XXX XXX',
      email: 'desk@kisumumissionclinic.org',
      joinedDate: '26 Oct 2026',
      registrationNumber: 'KMPDC-FAC/2026/319',
      doctorsCount: 7,
      departments: ['Primary Care', 'Maternal Health', 'Dispensary'],
    },
  ]);

  searchPlaceholder = computed(() => {
    switch (this.activeCategory()) {
      case 'customers':
        return 'Search customers';
      case 'doctors':
        return 'Search doctors';
      case 'nurses':
        return 'Search nurses';
      case 'chemists':
        return 'Search chemists';
      case 'hospitals':
        return 'Search hospitals';
    }
  });

  filteredCustomers = computed(() => {
    const q = this.searchTerm().toLowerCase().trim();
    const st = this.activeStatus();
    return this.customers().filter((c) => {
      const statusOk = st === 'all' || c.status === st;
      const queryOk =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.county.toLowerCase().includes(q);
      return statusOk && queryOk;
    });
  });

  filteredDoctors = computed(() => {
    const q = this.searchTerm().toLowerCase().trim();
    const st = this.activeStatus();
    return this.doctors().filter((d) => {
      const statusOk = st === 'all' || d.status === st;
      const queryOk =
        !q ||
        d.name.toLowerCase().includes(q) ||
        d.city.toLowerCase().includes(q) ||
        d.specialty.toLowerCase().includes(q);
      return statusOk && queryOk;
    });
  });

  filteredNurses = computed(() => {
    const q = this.searchTerm().toLowerCase().trim();
    const st = this.activeStatus();
    return this.nurses().filter((n) => {
      const statusOk = st === 'all' || n.status === st;
      const queryOk =
        !q ||
        n.name.toLowerCase().includes(q) ||
        n.city.toLowerCase().includes(q) ||
        n.service.toLowerCase().includes(q);
      return statusOk && queryOk;
    });
  });

  filteredChemists = computed(() => {
    const q = this.searchTerm().toLowerCase().trim();
    const st = this.activeStatus();
    return this.chemists().filter((ch) => {
      const statusOk = st === 'all' || ch.status === st;
      const queryOk =
        !q ||
        ch.name.toLowerCase().includes(q) ||
        ch.city.toLowerCase().includes(q) ||
        ch.licenceNumber.toLowerCase().includes(q) ||
        ch.subscriptionPlan.toLowerCase().includes(q);
      return statusOk && queryOk;
    });
  });

  filteredHospitals = computed(() => {
    const q = this.searchTerm().toLowerCase().trim();
    const st = this.activeStatus();
    return this.hospitals().filter((h) => {
      const statusOk = st === 'all' || h.status === st;
      const queryOk =
        !q ||
        h.name.toLowerCase().includes(q) ||
        h.county.toLowerCase().includes(q) ||
        h.type.toLowerCase().includes(q) ||
        h.level.toLowerCase().includes(q);
      return statusOk && queryOk;
    });
  });

  currentCustomer = computed(() => {
    if (this.selectedCategory() !== 'customers') return null;
    const id = this.selectedId();
    return this.customers().find((c) => c.id === id) ?? null;
  });

  currentDoctor = computed(() => {
    if (this.selectedCategory() !== 'doctors') return null;
    const id = this.selectedId();
    return this.doctors().find((d) => d.id === id) ?? null;
  });

  currentNurse = computed(() => {
    if (this.selectedCategory() !== 'nurses') return null;
    const id = this.selectedId();
    return this.nurses().find((n) => n.id === id) ?? null;
  });

  currentChemist = computed(() => {
    if (this.selectedCategory() !== 'chemists') return null;
    const id = this.selectedId();
    return this.chemists().find((ch) => ch.id === id) ?? null;
  });

  currentHospital = computed(() => {
    if (this.selectedCategory() !== 'hospitals') return null;
    const id = this.selectedId();
    return this.hospitals().find((h) => h.id === id) ?? null;
  });

  selectCategory(cat: UserCategoryTab): void {
    this.activeCategory.set(cat);
    this.selectedCategory.set(null);
    this.selectedId.set(null);
  }

  selectStatus(st: UserStatusFilter): void {
    this.activeStatus.set(st);
  }

  onSearch(): void {
    // Computed signals update live
  }

  openDetails(category: UserCategoryTab, id: string): void {
    this.selectedCategory.set(category);
    this.selectedId.set(id);
  }

  backToList(): void {
    this.selectedCategory.set(null);
    this.selectedId.set(null);
  }

  categoryLabel(cat: UserCategoryTab): string {
    switch (cat) {
      case 'customers':
        return 'Customers';
      case 'doctors':
        return 'Doctors';
      case 'nurses':
        return 'Nurses';
      case 'chemists':
        return 'Chemists';
      case 'hospitals':
        return 'Hospitals';
    }
  }

  statusLabel(status: UserAccountStatus): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  openReasonModal(type: 'suspend' | 'ban'): void {
    this.pendingActionType.set(type);
    this.actionReason.set(
      type === 'suspend'
        ? 'Temporary suspension pending compliance or licence check'
        : 'Account banned due to platform policy breach'
    );
    this.showReasonModal.set(true);
  }

  closeReasonModal(): void {
    this.showReasonModal.set(false);
    this.actionReason.set('');
  }

  confirmReasonAction(): void {
    const cat = this.selectedCategory();
    const id = this.selectedId();
    if (!cat || !id) return;

    const nextStatus: UserAccountStatus =
      this.pendingActionType() === 'suspend' ? 'suspended' : 'banned';
    const reasonText = this.actionReason().trim() || 'Recorded by platform admin';

    if (cat === 'customers') {
      this.customers.update((list) =>
        list.map((c) => (c.id === id ? { ...c, status: nextStatus, reason: reasonText } : c))
      );
    } else if (cat === 'doctors') {
      this.doctors.update((list) =>
        list.map((d) => (d.id === id ? { ...d, status: nextStatus, reason: reasonText } : d))
      );
    } else if (cat === 'nurses') {
      this.nurses.update((list) =>
        list.map((n) => (n.id === id ? { ...n, status: nextStatus, reason: reasonText } : n))
      );
    } else if (cat === 'chemists') {
      this.chemists.update((list) =>
        list.map((ch) => (ch.id === id ? { ...ch, status: nextStatus, reason: reasonText } : ch))
      );
    } else if (cat === 'hospitals') {
      this.hospitals.update((list) =>
        list.map((h) => (h.id === id ? { ...h, status: nextStatus, reason: reasonText } : h))
      );
    }

    this.closeReasonModal();
    this.flashNotice(
      nextStatus === 'suspended' ? 'Account suspended and reason saved.' : 'Account banned and reason saved.'
    );
  }

  restoreActive(): void {
    const cat = this.selectedCategory();
    const id = this.selectedId();
    if (!cat || !id) return;

    if (cat === 'customers') {
      this.customers.update((list) =>
        list.map((c) => (c.id === id ? { ...c, status: 'active', reason: undefined } : c))
      );
    } else if (cat === 'doctors') {
      this.doctors.update((list) =>
        list.map((d) => (d.id === id ? { ...d, status: 'active', reason: undefined } : d))
      );
    } else if (cat === 'nurses') {
      this.nurses.update((list) =>
        list.map((n) => (n.id === id ? { ...n, status: 'active', reason: undefined } : n))
      );
    } else if (cat === 'chemists') {
      this.chemists.update((list) =>
        list.map((ch) => (ch.id === id ? { ...ch, status: 'active', reason: undefined } : ch))
      );
    } else if (cat === 'hospitals') {
      this.hospitals.update((list) =>
        list.map((h) => (h.id === id ? { ...h, status: 'active', reason: undefined } : h))
      );
    }

    this.flashNotice('Account status set to Active.');
  }

  requestRenewal(): void {
    const cat = this.selectedCategory();
    const id = this.selectedId();
    if (!cat || !id) return;

    if (cat === 'doctors') {
      this.doctors.update((list) =>
        list.map((d) => (d.id === id ? { ...d, renewalRequested: true } : d))
      );
    } else if (cat === 'nurses') {
      this.nurses.update((list) =>
        list.map((n) => (n.id === id ? { ...n, renewalRequested: true } : n))
      );
    } else if (cat === 'chemists') {
      this.chemists.update((list) =>
        list.map((ch) => (ch.id === id ? { ...ch, renewalRequested: true } : ch))
      );
    }
    this.flashNotice(
      cat === 'chemists'
        ? 'PPB licence renewal reminder sent to chemist.'
        : 'Licence renewal reminder sent to practitioner.'
    );
  }

  openPatientNote(patient: ProviderTreatedPatient): void {
    this.activeNotePatient.set(patient);
  }

  closePatientNote(): void {
    this.activeNotePatient.set(null);
  }

  private flashNotice(msg: string): void {
    this.statusNotice.set(msg);
    setTimeout(() => {
      this.statusNotice.set(null);
    }, 3200);
  }
}
