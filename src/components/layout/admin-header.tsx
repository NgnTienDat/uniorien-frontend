import Link from 'next/link'
import React from 'react'

function AdminHeader() {
    return (
        <div className="bg-white border-b border-gray-200 px-10 py-3 flex items-center gap-8">
            <Link href="/admin" className="text-xl font-semibold text-blue-600">
                UniOrien - Admin
            </Link>

        </div>
    )
}

export default AdminHeader