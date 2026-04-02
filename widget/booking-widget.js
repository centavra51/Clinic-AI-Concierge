(function () {
    const script = document.currentScript;
    const ds = script?.dataset || {};
    const rootConfig = document.body?.dataset || {};

    const CONFIG = {
        clinicId: ds.clinicId || rootConfig.clinicId || '',
        webhookUrl: ds.webhookUrl || rootConfig.webhookUrl || 'https://auto.amz-creator.com/webhook/dental-ai',
        title: ds.title || 'Online Booking',
        subtitle: ds.subtitle || 'Choose a doctor and available time',
        primaryColor: ds.primaryColor || '#0f766e',
        accentColor: ds.accentColor || '#f59e0b',
        textColor: ds.textColor || '#0f172a',
        cardColor: ds.cardColor || '#ffffff',
        locale: document.documentElement.lang || 'ru',
    };

    if (!CONFIG.clinicId) {
        console.warn('booking-widget.js: missing clinicId');
        return;
    }

    const mount = document.createElement('div');
    mount.id = 'dental-booking-widget-root';
    script.parentNode.insertBefore(mount, script.nextSibling);

    const shadow = mount.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      :host {
        --bw-primary: ${CONFIG.primaryColor};
        --bw-accent: ${CONFIG.accentColor};
        --bw-text: ${CONFIG.textColor};
        --bw-card: ${CONFIG.cardColor};
        --bw-line: rgba(15, 23, 42, 0.08);
        --bw-muted: #64748b;
        font-family: Georgia, "Times New Roman", serif;
      }

      * { box-sizing: border-box; }

      .widget {
        color: var(--bw-text);
        background: linear-gradient(180deg, rgba(255,255,255,0.96), rgba(247,248,248,0.95));
        border: 1px solid rgba(255,255,255,0.72);
        border-radius: 32px;
        padding: 24px;
        box-shadow: 0 24px 60px rgba(15, 23, 42, 0.12);
      }

      .head {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: end;
        margin-bottom: 22px;
      }

      .eyebrow {
        display: inline-flex;
        padding: 8px 12px;
        border-radius: 999px;
        background: rgba(15, 118, 110, 0.1);
        color: var(--bw-primary);
        font: 700 12px/1 Arial, sans-serif;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      h2 {
        margin: 14px 0 8px;
        font-size: clamp(28px, 4vw, 42px);
        line-height: 1;
        letter-spacing: -0.04em;
      }

      .copy {
        margin: 0;
        color: var(--bw-muted);
        font: 14px/1.7 Arial, sans-serif;
        max-width: 52ch;
      }

      .status {
        min-height: 22px;
        color: var(--bw-muted);
        font: 13px/1.5 Arial, sans-serif;
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 18px;
      }

      .panel {
        background: var(--bw-card);
        border-radius: 24px;
        border: 1px solid var(--bw-line);
        padding: 18px;
      }

      .panel-title {
        margin: 0 0 14px;
        font-size: 20px;
      }

      .doctor-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }

      .doctor {
        border: 2px solid transparent;
        border-radius: 24px;
        padding: 14px;
        text-align: center;
        background: #f8fafc;
        cursor: pointer;
        transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      }

      .doctor:hover {
        transform: translateY(-2px);
      }

      .doctor.active {
        border-color: var(--bw-primary);
        box-shadow: 0 18px 34px rgba(15, 118, 110, 0.12);
        background: #f0fdfa;
      }

      .doctor img {
        width: 72px;
        height: 72px;
        object-fit: cover;
        border-radius: 50%;
        display: block;
        margin: 0 auto 12px;
        background: #e5e7eb;
      }

      .doctor strong {
        display: block;
        font-size: 16px;
        margin-bottom: 6px;
      }

      .doctor span {
        color: var(--bw-muted);
        font: 12px/1.5 Arial, sans-serif;
      }

      .toolbar {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        align-items: center;
        margin-bottom: 14px;
      }

      .toolbar input,
      .form input {
        width: 100%;
        border: 1px solid var(--bw-line);
        border-radius: 16px;
        padding: 12px 14px;
        font: 14px/1.2 Arial, sans-serif;
        outline: none;
      }

      .toolbar input:focus,
      .form input:focus {
        border-color: var(--bw-primary);
        box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.12);
      }

      .slots {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
      }

      .slot {
        border: 1px solid var(--bw-line);
        border-radius: 16px;
        padding: 12px 10px;
        background: #fff;
        cursor: pointer;
        font: 700 13px/1 Arial, sans-serif;
        transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      }

      .slot:hover {
        transform: translateY(-2px);
        background: var(--bw-primary);
        color: #fff;
        border-color: var(--bw-primary);
      }

      .slot.active {
        background: var(--bw-primary);
        color: #fff;
        border-color: var(--bw-primary);
      }

      .empty {
        color: var(--bw-muted);
        font: 14px/1.7 Arial, sans-serif;
        padding: 10px 0 4px;
      }

      .form {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }

      .form .full {
        grid-column: 1 / -1;
      }

      .cta {
        margin-top: 14px;
        width: 100%;
        border: 0;
        border-radius: 18px;
        padding: 14px 18px;
        color: #fff;
        cursor: pointer;
        background: linear-gradient(135deg, var(--bw-primary), #134e4a);
        font: 700 15px/1 Arial, sans-serif;
        box-shadow: 0 18px 34px rgba(15, 118, 110, 0.22);
      }

      .cta:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        box-shadow: none;
      }

      .success {
        margin-top: 14px;
        border-radius: 18px;
        padding: 14px 16px;
        background: rgba(16, 185, 129, 0.12);
        color: #065f46;
        font: 14px/1.6 Arial, sans-serif;
      }

      @media (max-width: 820px) {
        .doctor-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .slots {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }

      @media (max-width: 560px) {
        .widget {
          border-radius: 24px;
          padding: 16px;
        }

        .doctor-grid,
        .slots,
        .form {
          grid-template-columns: 1fr;
        }

        .head,
        .toolbar {
          flex-direction: column;
          align-items: stretch;
        }
      }
    `;

    shadow.appendChild(style);

    const wrapper = document.createElement('div');
    wrapper.className = 'widget';
    wrapper.innerHTML = `
      <div class="head">
        <div>
          <div class="eyebrow">Booking widget</div>
          <h2>${CONFIG.title}</h2>
          <p class="copy">${CONFIG.subtitle}</p>
        </div>
        <div class="status" id="status">Loading doctors...</div>
      </div>

      <div class="grid">
        <section class="panel">
          <h3 class="panel-title">Choose a doctor</h3>
          <div class="doctor-grid" id="doctor-grid"></div>
        </section>

        <section class="panel">
          <div class="toolbar">
            <h3 class="panel-title" style="margin:0;">Available time</h3>
            <input type="date" id="selected-date">
          </div>
          <div class="slots" id="slots"></div>
          <div class="empty" id="slots-empty"></div>
        </section>

        <section class="panel">
          <h3 class="panel-title">Complete booking</h3>
          <div class="form">
            <input id="patient-name" class="full" type="text" placeholder="Patient name">
            <input id="patient-phone" type="tel" placeholder="Phone number">
            <input id="patient-email" type="email" placeholder="Email (optional)">
          </div>
          <button class="cta" id="submit-booking" disabled>Book appointment</button>
          <div id="booking-success"></div>
        </section>
      </div>
    `;
    shadow.appendChild(wrapper);

    const doctorGrid = shadow.getElementById('doctor-grid');
    const dateInput = shadow.getElementById('selected-date');
    const slotsEl = shadow.getElementById('slots');
    const slotsEmptyEl = shadow.getElementById('slots-empty');
    const statusEl = shadow.getElementById('status');
    const submitBtn = shadow.getElementById('submit-booking');
    const successEl = shadow.getElementById('booking-success');
    const nameInput = shadow.getElementById('patient-name');
    const phoneInput = shadow.getElementById('patient-phone');
    const emailInput = shadow.getElementById('patient-email');

    const state = {
        doctors: [],
        selectedDoctor: null,
        selectedSlot: null,
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.valueAsDate = tomorrow;

    function setStatus(text) {
        statusEl.textContent = text;
    }

    function escapeHtml(value) {
        return String(value ?? '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function syncButton() {
        submitBtn.disabled = !(state.selectedDoctor && state.selectedSlot && nameInput.value.trim() && phoneInput.value.trim());
    }

    async function postJson(payload) {
        const res = await fetch(CONFIG.webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message || 'Request failed');
        }
        return data;
    }

    function renderDoctors() {
        doctorGrid.innerHTML = '';
        state.doctors.forEach((doctor) => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'doctor' + (state.selectedDoctor?.id === doctor.id ? ' active' : '');
            card.innerHTML = `
              <img src="${escapeHtml(doctor.avatar_url || 'https://i.pravatar.cc/150')}" alt="${escapeHtml(doctor.full_name)}">
              <strong>${escapeHtml(doctor.full_name)}</strong>
              <span>${escapeHtml(doctor.specialty || '')}</span>
            `;
            card.onclick = () => {
                state.selectedDoctor = doctor;
                state.selectedSlot = null;
                successEl.innerHTML = '';
                renderDoctors();
                loadSlots();
                syncButton();
            };
            doctorGrid.appendChild(card);
        });
    }

    function renderSlots(slots) {
        slotsEl.innerHTML = '';
        slotsEmptyEl.textContent = '';

        if (!slots || !slots.length) {
            slotsEmptyEl.textContent = 'No free slots for this date.';
            return;
        }

        slots.forEach((slot) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'slot' + (state.selectedSlot?.time === slot.time ? ' active' : '');
            btn.textContent = slot.time;
            btn.onclick = () => {
                state.selectedSlot = slot;
                renderSlots(slots);
                syncButton();
            };
            slotsEl.appendChild(btn);
        });
    }

    async function loadDoctors() {
        try {
            setStatus('Loading doctors...');
            const data = await postJson({
                action: 'get_doctors',
                clinic_id: CONFIG.clinicId,
            });
            state.doctors = Array.isArray(data.doctors) ? data.doctors : [];
            renderDoctors();
            setStatus(state.doctors.length ? 'Doctors loaded' : 'No doctors available');
        } catch (error) {
            setStatus('Could not load doctors');
            doctorGrid.innerHTML = `<div class="empty">${escapeHtml(error.message)}</div>`;
        }
    }

    async function loadSlots() {
        if (!state.selectedDoctor) {
            renderSlots([]);
            slotsEmptyEl.textContent = 'Choose a doctor to see available time.';
            return;
        }

        try {
            setStatus('Loading available time...');
            const data = await postJson({
                action: 'get_slots',
                clinic_id: CONFIG.clinicId,
                doctor_id: state.selectedDoctor.id,
                date: dateInput.value,
            });
            renderSlots(data.available_slots || []);
            setStatus('Available time loaded');
        } catch (error) {
            renderSlots([]);
            slotsEmptyEl.textContent = 'Could not load slots.';
            setStatus(error.message || 'Slots request failed');
        }
    }

    async function submitBooking() {
        if (!state.selectedDoctor || !state.selectedSlot) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Booking...';
        successEl.innerHTML = '';

        try {
            const data = await postJson({
                action: 'book_appointment',
                clinic_id: CONFIG.clinicId,
                doctor_id: state.selectedDoctor.id,
                date: dateInput.value,
                time: state.selectedSlot.time,
                patient_name: nameInput.value.trim(),
                patient_phone: phoneInput.value.trim(),
                patient_email: emailInput.value.trim(),
                source: 'booking_widget_embed',
            });

            successEl.innerHTML = `
              <div class="success">
                Booking confirmed.<br>
                ${escapeHtml(data.appointment.doctor_name)}<br>
                ${escapeHtml(data.appointment.date)} ${escapeHtml(data.appointment.time)}
              </div>
            `;
            setStatus('Appointment booked');
            state.selectedSlot = null;
            renderSlots([]);
            loadSlots();
        } catch (error) {
            successEl.innerHTML = `<div class="success" style="background:rgba(239,68,68,0.12);color:#991b1b;">${escapeHtml(error.message || 'Booking failed')}</div>`;
            setStatus('Booking failed');
        } finally {
            submitBtn.textContent = 'Book appointment';
            syncButton();
        }
    }

    dateInput.addEventListener('change', () => {
        state.selectedSlot = null;
        successEl.innerHTML = '';
        loadSlots();
        syncButton();
    });
    nameInput.addEventListener('input', syncButton);
    phoneInput.addEventListener('input', syncButton);
    emailInput.addEventListener('input', syncButton);
    submitBtn.addEventListener('click', submitBooking);

    loadDoctors();
})();
