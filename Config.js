// Supabase Configuration
const SUPABASE_URL = 'https://bqsmlubhwvmjlyowctqy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxc21sdWJod3Ztamx5b3djdHF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NTk5NzIsImV4cCI6MjA4ODQzNTk3Mn0.rYvhWAZOhc1ZNAOJJ-DvThkCsLOCveqzXmDrZS_hdQk';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// User Online Status Update Korar Function
async function setUserOnline(mobileNumber) {
    const { data, error } = await supabase
        .from('profiles')
        .upsert({ 
            mobile_number: mobileNumber, 
            status: 'online', 
            last_seen: new Date() 
        }, { onConflict: 'mobile_number' });

    if (error) console.error("Error updating status:", error);
    else console.log("User is now Online!");
}

// Browser tab bondho korle offline hoye jabe
window.addEventListener('beforeunload', async () => {
    const myNumber = localStorage.getItem('my_number');
    if (myNumber) {
        await supabase
            .from('profiles')
            .update({ status: 'offline' })
            .eq('mobile_number', myNumber);
    }
});
